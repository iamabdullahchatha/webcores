import { createClient } from "@supabase/supabase-js";

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

// In-memory rate limit. Lives only as long as the serverless instance —
// good enough for a low-traffic admin login endpoint; not a hard guarantee.
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const ipHits = new Map(); // ip -> number[] (timestamps)

function checkRateLimit(ip) {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipHits.get(ip) ?? []).filter((t) => t > cutoff);
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return true;
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
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ success: false, error: "Too many requests" });
  }

  // Body
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  const { userId, email, success, failure_reason } = body;

  if (typeof success !== "boolean") {
    return res.status(400).json({ success: false, error: "success (boolean) required" });
  }

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
    return res.status(500).json({ success: false, error: error.message });
  }

  return res.status(200).json({ success: true });
}
