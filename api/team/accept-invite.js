import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/team/accept-invite
 * Body: { token, password }
 * Public endpoint — no auth required (the invite token is the proof).
 *
 * Flow:
 *  1. Look up the pending profile by invite_token
 *  2. Create the auth user via service-role signUp
 *  3. Delete the placeholder profile row, insert a new one with the real auth UUID
 *  4. Return { email } so the frontend can sign in
 */

const PUBLIC_SITE_URL = process.env.PUBLIC_SITE_URL ?? "https://www.webcoreuae.com";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", PUBLIC_SITE_URL);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: "Server not configured" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  const { token, password } = body;

  if (!token || !password || password.length < 8) {
    return res.status(400).json({ error: "token and password (min 8 chars) are required" });
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // 1. Find the pending profile
  const { data: pending, error: findErr } = await admin
    .from("profiles")
    .select("id, email, full_name, role, invited_by, created_at")
    .eq("invite_token", token)
    .eq("is_active", false)
    .maybeSingle();

  if (findErr || !pending) {
    return res.status(404).json({ error: "This invite link is invalid or has already been used." });
  }

  // 2. Create the auth user
  const { data: authData, error: signUpErr } = await admin.auth.admin.createUser({
    email: pending.email,
    password,
    email_confirm: true,
  });

  if (signUpErr) {
    if (signUpErr.message?.includes("already registered")) {
      return res.status(409).json({ error: "An account with this email already exists. Please sign in." });
    }
    return res.status(500).json({ error: signUpErr.message });
  }

  const authUserId = authData.user?.id;
  if (!authUserId) return res.status(500).json({ error: "Failed to create user account." });

  // 3. Delete the placeholder row, insert the real one with correct auth UUID
  const { error: delErr } = await admin
    .from("profiles")
    .delete()
    .eq("id", pending.id);

  if (delErr) {
    // Clean up the auth user we just created
    await admin.auth.admin.deleteUser(authUserId);
    return res.status(500).json({ error: delErr.message });
  }

  const { error: insertErr } = await admin.from("profiles").insert({
    id: authUserId,
    email: pending.email,
    full_name: pending.full_name,
    role: pending.role,
    invite_token: null,
    invited_by: pending.invited_by,
    is_active: true,
    created_at: pending.created_at,
  });

  if (insertErr) {
    await admin.auth.admin.deleteUser(authUserId);
    return res.status(500).json({ error: insertErr.message });
  }

  return res.status(200).json({ success: true, email: pending.email });
}
