import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

/**
 * POST /api/team/invite
 * Body: { full_name, email, role: 'admin'|'editor' }
 * Auth: Bearer token (Supabase anon JWT). Caller must be owner or admin.
 */

const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL ?? "https://www.webcoreuae.com";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  return typeof xff === "string" ? xff.split(",")[0].trim() : (req.socket?.remoteAddress ?? "unknown");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", PUBLIC_SITE_URL);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: "Server not configured" });
  }

  // Verify caller is authenticated and has owner or admin role
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
  const userClient = createClient(SUPABASE_URL, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) return res.status(401).json({ error: "Unauthorized" });

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: callerProfile } = await admin
    .from("profiles")
    .select("role, full_name, is_active")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (!callerProfile?.is_active || !["owner", "admin"].includes(callerProfile.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  const { full_name, email, role } = body;

  if (!full_name || !email || !["admin", "editor"].includes(role)) {
    return res.status(400).json({ error: "full_name, email, and role (admin|editor) are required" });
  }

  // Admin can only invite editors
  if (callerProfile.role === "admin" && role !== "editor") {
    return res.status(403).json({ error: "Admins can only invite editors" });
  }

  // Check for existing profile with this email
  const { data: existing } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
  if (existing) return res.status(409).json({ error: "A user with this email already exists" });

  const token_value = crypto.randomUUID();

  // Insert pending profile (no auth user yet — created on accept)
  const { error: insertErr } = await admin.from("profiles").insert({
    id: crypto.randomUUID(),
    email,
    full_name,
    role,
    invite_token: token_value,
    invited_by: userData.user.id,
    is_active: false,
  });

  if (insertErr) return res.status(500).json({ error: insertErr.message });

  // Send invite email via Resend
  if (RESEND_API_KEY) {
    const resend = new Resend(RESEND_API_KEY);
    const acceptUrl = `${PUBLIC_SITE_URL}/admin/accept-invite?token=${token_value}`;
    const inviterName = callerProfile.full_name ?? "Webcore Admin";

    await resend.emails.send({
      from: "no-reply@webcoreuae.com",
      to: email,
      subject: "You have been invited to Webcore CMS",
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;max-width:560px;width:100%">
        <tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px">
          <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px">Webcore Solutions</p>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.7)">CMS Invitation</p>
        </td></tr>
        <tr><td style="padding:40px">
          <p style="margin:0 0 8px;font-size:24px;font-weight:700;color:#f1f5f9;line-height:1.3">You're invited to join the CMS</p>
          <p style="margin:0 0 28px;font-size:15px;color:#94a3b8;line-height:1.6"><strong style="color:#e2e8f0">${inviterName}</strong> has invited you to collaborate on the Webcore Solutions CMS as a <strong style="color:#e2e8f0">${role}</strong>.</p>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px"><tr><td>
            <a href="${acceptUrl}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:10px;letter-spacing:0.1px">Accept Invitation &rarr;</a>
          </td></tr></table>
          <p style="margin:0 0 6px;font-size:13px;color:#64748b">Or copy this link into your browser:</p>
          <p style="margin:0;font-size:12px;color:#6366f1;word-break:break-all">${acceptUrl}</p>
          <hr style="margin:32px 0;border:none;border-top:1px solid rgba(255,255,255,0.08)">
          <p style="margin:0;font-size:12px;color:#475569;line-height:1.6">This invitation expires in 7 days. If you did not expect this email, you can safely ignore it.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });
  }

  return res.status(200).json({ success: true });
}
