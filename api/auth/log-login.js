import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { validate } from "../_validate.js";
import { serverError } from "../_utils.js";

/**
 * Records a login attempt in public.login_history.
 *
 * Uses the service-role key — bypasses RLS so the public anon caller
 * cannot read other users' rows, but every successful or failed login
 * is still captured server-side.
 *
 * POST /api/auth/log-login
 * Body: { success: boolean, userId?: string, email?: string, failure_reason?: string }
 */

const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Distributed rate limit backed by Upstash Redis — survives serverless
// cold starts, unlike the previous in-memory Map.
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(RATE_LIMIT_MAX, `${RATE_LIMIT_WINDOW_MS / 1000} s`),
  prefix: "ratelimit:log-login",
});

async function checkRateLimit(ip) {
  try {
    const { success } = await ratelimit.limit(ip);
    return success;
  } catch (err) {
    // Fail open: if Upstash is unreachable, allow the request through.
    console.warn("Rate limiter unavailable, failing open:", err?.message ?? err);
    return true;
  }
}

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // Origin check
  const origin = req.headers.origin;
  if (PUBLIC_SITE_URL && origin !== PUBLIC_SITE_URL) {
    return res.status(403).json({ success: false, error: "Forbidden origin" });
  }

  // Server config check
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return res.status(500).json({ success: false, error: "Server not configured" });
  }

  const ip = getClientIp(req);
  if (!(await checkRateLimit(ip))) {
    return res.status(429).json({ success: false, error: "Too many requests" });
  }

  // Body
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});

  if (typeof body.success !== "boolean") {
    return res.status(400).json({ success: false, error: "success (boolean) required" });
  }

  const { valid } = validate(body, {
    userId:         { required: false, type: "uuid" },
    email:          { required: false, type: "email" },
    failure_reason: { required: false, maxLen: 500 },
  });
  if (!valid) return res.status(400).json({ success: false, error: "Invalid input" });

  const { userId, email, success, failure_reason } = body;

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { error } = await admin.from("login_history").insert({
    user_id: userId ?? null,
    email: email ?? null,
    success,
    failure_reason: failure_reason ?? null,
    ip_address: ip,
    user_agent: req.headers["user-agent"] ?? null,
  });

  if (error) {
    return serverError(res, error);
  }

  return res.status(200).json({ success: true });
}
