import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { validate } from "./_validate.js";

const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL;
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const REQUIRED_ENV = {
  PUBLIC_SITE_URL,
  RESEND_API_KEY,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: SERVICE_ROLE_KEY,
  UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN,
};

function getEnvStatus() {
  return Object.fromEntries(
    Object.entries(REQUIRED_ENV).map(([name, value]) => [name, Boolean(value)]),
  );
}

const missingEnvVars = Object.entries(getEnvStatus())
  .filter(([, exists]) => !exists)
  .map(([name]) => name);

if (missingEnvVars.length > 0) {
  console.error("api/contact missing required environment variables:", {
    statusCode: 500,
    missingEnvVars,
  });
}

function getStatusCode(err) {
  return (
    err?.statusCode ?? err?.status ?? err?.response?.statusCode ?? err?.response?.status ?? null
  );
}

function logError(message, err, extra = {}) {
  const { statusCode, ...extraFields } = extra;

  console.error(message, {
    statusCode: statusCode ?? getStatusCode(err),
    code: err?.code ?? null,
    error: err,
    ...extraFields,
  });
}

function createError(message, fields = {}) {
  const err = new Error(message);
  Object.assign(err, fields);
  return err;
}

function buildAllowedOrigins(siteUrl) {
  if (!siteUrl) return [];

  try {
    const url = new URL(siteUrl);
    const origins = new Set([url.origin]);
    const hostWithoutWww = url.hostname.replace(/^www\./, "");
    const alternateHost = url.hostname.startsWith("www.")
      ? hostWithoutWww
      : `www.${hostWithoutWww}`;
    const port = url.port ? `:${url.port}` : "";

    origins.add(`${url.protocol}//${alternateHost}${port}`);

    return [...origins];
  } catch (err) {
    logError("Invalid PUBLIC_SITE_URL:", err);
    return [];
  }
}

const ALLOWED_ORIGINS = buildAllowedOrigins(PUBLIC_SITE_URL);
const resend = new Resend(RESEND_API_KEY);

function getCorsOrigin(origin) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) return origin;
  return ALLOWED_ORIGINS[0] ?? "";
}

function isAllowedOrigin(origin) {
  return ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin);
}

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 600_000; // 10 minutes

const hasUpstashConfig = Boolean(UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN);

// In-memory fallback: simple sliding window per IP using a Map.
// On Vercel this resets on cold starts, so Upstash remains the durable limiter.
const _fallbackCounts = new Map();
const FALLBACK_LIMIT = 3;
const FALLBACK_WINDOW_MS = 600_000; // 10 minutes, matches Upstash config

function fallbackRateLimit(ip) {
  const now = Date.now();
  const entry = _fallbackCounts.get(ip) ?? { count: 0, windowStart: now };

  if (now - entry.windowStart > FALLBACK_WINDOW_MS) {
    entry.count = 0;
    entry.windowStart = now;
  }

  entry.count += 1;
  _fallbackCounts.set(ip, entry);

  return entry.count <= FALLBACK_LIMIT;
}

async function upstashRequest(path, body) {
  const response = await fetch(`${UPSTASH_REDIS_REST_URL.replace(/\/+$/, "")}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    throw createError("Invalid Upstash REST JSON response", {
      statusCode: response.status,
      statusText: response.statusText,
      body: text,
      cause: err,
    });
  }

  if (!response.ok) {
    throw createError("Upstash REST request failed", {
      statusCode: response.status,
      statusText: response.statusText,
      body: data,
    });
  }

  return data;
}

async function checkUpstashRateLimit(ip) {
  const key = `ratelimit:contact:${ip}`;
  const results = await upstashRequest("/pipeline", [
    ["INCR", key],
    ["PTTL", key],
  ]);
  const [countResult, ttlResult] = Array.isArray(results) ? results : [];

  if (countResult?.error || ttlResult?.error) {
    throw createError("Upstash rate limit pipeline failed", {
      statusCode: 502,
      error: countResult?.error ?? ttlResult?.error,
      results,
    });
  }

  const count = Number(countResult?.result ?? 0);
  const ttl = Number(ttlResult?.result ?? -1);

  if (count === 1 || ttl < 0) {
    const expireResult = await upstashRequest("", ["PEXPIRE", key, RATE_LIMIT_WINDOW_MS]);

    if (expireResult?.error) {
      throw createError("Upstash rate limit expire failed", {
        statusCode: 502,
        error: expireResult.error,
        result: expireResult,
      });
    }
  }

  return count <= RATE_LIMIT_MAX;
}

async function checkRateLimit(ip) {
  if (!hasUpstashConfig) {
    console.warn("Upstash rate limiter env missing, using in-memory fallback:", {
      statusCode: 503,
      missingEnvVars: missingEnvVars.filter((name) => name.startsWith("UPSTASH_")),
    });
    return fallbackRateLimit(ip);
  }

  try {
    return await checkUpstashRateLimit(ip);
  } catch (err) {
    logError("Rate limiter unavailable, using in-memory fallback:", err);
    return fallbackRateLimit(ip);
  }
}

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (typeof xff === "string" && xff.length > 0) {
    return xff.split(",")[0].trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}

const sanitize = (s) =>
  String(s ?? "")
    .replace(/<[^>]*>/g, "")
    .trim();

const escapeHtml = (s) =>
  sanitize(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

function autoReplyHtml(name, service) {
  const serviceRow = service
    ? `<p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.6">
         You enquired about: <strong style="color:#e2e8f0">${escapeHtml(service)}</strong>
       </p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;max-width:560px;width:100%">
        <tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px">
          <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px">Webcore Solutions</p>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.7)">Message Received</p>
        </td></tr>
        <tr><td style="padding:40px">
          <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#f1f5f9;line-height:1.3">Thanks for reaching out, ${escapeHtml(name)}!</p>
          <p style="margin:0 0 20px;font-size:15px;color:#94a3b8;line-height:1.6">
            We've received your message and our team will review it shortly.
            You can expect a response within 24 business hours.
          </p>
          ${serviceRow}
          <p style="margin:0 0 20px;font-size:15px;color:#94a3b8;line-height:1.6">
            Need an urgent response? Reach us directly on WhatsApp:
          </p>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px"><tr><td>
            <a href="https://wa.me/447570792516" target="_blank" rel="noopener noreferrer" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:10px">
              Chat on WhatsApp &rarr;
            </a>
          </td></tr></table>
          <hr style="margin:0 0 24px;border:none;border-top:1px solid rgba(255,255,255,0.08)">
          <p style="margin:0;font-size:12px;color:#475569;line-height:1.6">
            This is an automated confirmation. Please do not reply to this email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function sendLeadNotificationEmail({
  name,
  email,
  phone,
  service,
  subject,
  message,
  fallbackReason,
}) {
  const fallbackNotice = fallbackReason
    ? `
          <p style="background:#fff3cd;border:1px solid #ffe08a;color:#664d03;padding:12px;border-radius:6px;">
            <b>Fallback email:</b> Supabase did not persist this lead. Reason: ${escapeHtml(fallbackReason)}
          </p>
        `
    : "";

  await resend.emails.send({
    from: "Webcore Solutions <no-reply@webcoreuae.com>",
    to: ["info@webcoreuae.com"],
    replyTo: email,
    subject: `${fallbackReason ? "[Contact Form][DB Fallback]" : "[Contact Form]"} ${escapeHtml(
      subject || "New Message",
    )} - from ${escapeHtml(name)}`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          ${fallbackNotice}
          <hr style="border: 1px solid #eee;" />
          <p><b>Name:</b> ${escapeHtml(name)}</p>
          <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
          <p><b>Phone:</b> ${escapeHtml(phone) || "N/A"}</p>
          <p><b>Service:</b> ${escapeHtml(service) || "N/A"}</p>
          <p><b>Subject:</b> ${escapeHtml(subject) || "N/A"}</p>
          <p><b>Message:</b></p>
          <p style="background:#f5f5f5; padding: 12px; border-radius: 6px;">${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        </div>
      `,
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", getCorsOrigin(req.headers.origin));
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method === "GET") {
    return res.status(missingEnvVars.length === 0 ? 200 : 503).json({
      ok: missingEnvVars.length === 0,
      env: getEnvStatus(),
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  if (!isAllowedOrigin(req.headers.origin)) {
    return res.status(403).json({ success: false, error: "Forbidden" });
  }

  const ip = getClientIp(req);
  if (!(await checkRateLimit(ip))) {
    return res
      .status(429)
      .json({ success: false, error: "Too many requests. Please wait 10 minutes." });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  } catch (err) {
    logError("Invalid contact request JSON:", err, { statusCode: 400 });
    return res.status(400).json({ success: false, error: "Invalid JSON body" });
  }

  if (body.hp && String(body.hp).length > 0) {
    return res.status(200).json({ success: true });
  }

  const { valid, errors } = validate(body, {
    name: { required: true, minLen: 2, maxLen: 100 },
    email: { required: true, type: "email" },
    phone: {
      required: false,
      minLen: 7,
      maxLen: 20,
      pattern: /^[\d\s+\-()]+$/,
      patternMsg: "Invalid phone format",
    },
    service: { required: false, maxLen: 100 },
    subject: { required: false, maxLen: 200 },
    message: { required: true, minLen: 5, maxLen: 5000 },
  });

  if (!valid) return res.status(400).json({ success: false, errors });

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const service = sanitize(body.service);
  const subject = sanitize(body.subject);
  const message = sanitize(body.message);

  let fallbackEmailReason = "";

  if (SUPABASE_URL && SERVICE_ROLE_KEY) {
    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error: dbErr } = await admin.from("contact_submissions").insert({
      name,
      email,
      phone: phone || null,
      service: service || null,
      subject: subject || null,
      message,
      ip_address: ip,
      status: "new",
      honeypot_triggered: false,
    });

    if (dbErr) {
      fallbackEmailReason = dbErr.message || dbErr.code || "contact_submissions insert failed";
      logError("contact_submissions insert error:", dbErr);
    } else {
      const { error: notifErr } = await admin.from("admin_notifications").insert({
        type: "contact",
        title: `New message from ${escapeHtml(name)}`,
        body: subject || message.slice(0, 80),
        link: "/admin/contacts",
        recipient_role: "all",
      });

      if (notifErr) logError("admin_notifications insert error:", notifErr);
    }
  } else {
    fallbackEmailReason = "Supabase environment variables are missing";
    console.error("Supabase persistence skipped:", {
      statusCode: 500,
      env: {
        SUPABASE_URL: Boolean(SUPABASE_URL),
        SUPABASE_SERVICE_ROLE_KEY: Boolean(SERVICE_ROLE_KEY),
      },
    });
  }

  try {
    await sendLeadNotificationEmail({
      name,
      email,
      phone,
      service,
      subject,
      message,
      fallbackReason: fallbackEmailReason,
    });
  } catch (err) {
    logError("Notification email error:", err, {
      fallbackEmailAttempted: Boolean(fallbackEmailReason),
    });

    if (fallbackEmailReason) {
      console.error("Contact lead was not persisted and fallback email failed:", {
        statusCode: getStatusCode(err) ?? 500,
      });
    }
  }

  try {
    await resend.emails.send({
      from: "Webcore Solutions <no-reply@webcoreuae.com>",
      to: [email],
      replyTo: "info@webcoreuae.com",
      subject: "We received your message - Webcore Solutions",
      html: autoReplyHtml(name, service),
    });
  } catch (err) {
    logError("Auto-reply email error:", err);
  }

  return res.status(200).json({ success: true });
}
