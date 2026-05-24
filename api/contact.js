import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { validate } from "./_validate.js";

const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const resend = new Resend(RESEND_API_KEY);

// ── Rate limiting ────────────────────────────────────────────────────────────
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 600_000; // 10 minutes
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

// ── Sanitization ─────────────────────────────────────────────────────────────
const sanitize = (s) =>
  String(s ?? "")
    .replace(/<[^>]*>/g, "")
    .trim();

// ── Auto-reply HTML ──────────────────────────────────────────────────────────
function autoReplyHtml(name, service) {
  const serviceRow = service
    ? `<p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.6">
         You enquired about: <strong style="color:#e2e8f0">${service}</strong>
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
          <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#f1f5f9;line-height:1.3">Thanks for reaching out, ${name}!</p>
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

// ── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // 1. Origin check
  if (PUBLIC_SITE_URL && req.headers.origin !== PUBLIC_SITE_URL) {
    return res.status(403).json({ success: false, error: "Forbidden" });
  }

  // 2. Rate limiting
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res
      .status(429)
      .json({ success: false, error: "Too many requests. Please wait 10 minutes." });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});

  // 3. Honeypot — silent success, no email, no DB write
  if (body.hp && String(body.hp).length > 0) {
    return res.status(200).json({ success: true });
  }

  // 4. Validation & sanitization
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
    message: { required: true, minLen: 10, maxLen: 5000 },
  });
  if (!valid) return res.status(400).json({ success: false, errors });

  const name = sanitize(body.name);
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  const service = sanitize(body.service);
  const subject = sanitize(body.subject);
  const message = sanitize(body.message);

  // 5. DB logging + in-app notification (non-blocking)
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
      console.error("contact_submissions insert error:", dbErr.message);
    } else {
      const { error: notifErr } = await admin.from("admin_notifications").insert({
        type: "contact",
        title: `New message from ${name}`,
        body: subject || message.slice(0, 80),
        link: "/admin/contacts",
        recipient_role: "all",
      });
      if (notifErr) console.error("admin_notifications insert error:", notifErr.message);
    }
  }

  // 6. Notification email to info@webcoreuae.com
  try {
    await resend.emails.send({
      from: "Webcore Solutions <no-reply@webcoreuae.com>",
      to: ["info@webcoreuae.com"],
      replyTo: email,
      subject: `[Contact Form] ${subject || "New Message"} — from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px;">
          <h2 style="color: #1a1a1a;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #eee;" />
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>
          <p><b>Service:</b> ${service || "N/A"}</p>
          <p><b>Subject:</b> ${subject || "N/A"}</p>
          <p><b>Message:</b></p>
          <p style="background:#f5f5f5; padding: 12px; border-radius: 6px;">${message}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Notification email error:", err?.message ?? err);
    return res
      .status(500)
      .json({ success: false, error: "Failed to send message. Please try again." });
  }

  // 7. Auto-reply to submitter
  try {
    await resend.emails.send({
      from: "Webcore Solutions <no-reply@webcoreuae.com>",
      to: [email],
      replyTo: "info@webcoreuae.com",
      subject: "We received your message — Webcore Solutions",
      html: autoReplyHtml(name, service),
    });
  } catch (err) {
    console.error("Auto-reply email error:", err?.message ?? err);
    // Never fail the user's submission because of the auto-reply
  }

  // 8. Success
  return res.status(200).json({ success: true });
}
