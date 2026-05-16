/**
 * Client-side auth helpers.
 *
 * All functions run in the browser and use the public anon client.
 * Login history is recorded via /api/auth/log-login (server-side
 * service-role insert).
 */

import { supabase } from "@/lib/supabase/client";
import type { AdminRole, Profile, Session } from "./types";

const LOG_LOGIN_ENDPOINT = "/api/auth/log-login";

const ROLE_RANK: Record<AdminRole, number> = {
  owner: 3,
  admin: 2,
  editor: 1,
};

/**
 * Best-effort fire-and-forget login logger.
 * Failures are intentionally swallowed — we never block the user on
 * an analytics-style write.
 */
async function logLoginAttempt(payload: {
  success: boolean;
  userId?: string;
  email?: string;
  failure_reason?: string;
}): Promise<void> {
  try {
    await fetch(LOG_LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    /* ignore */
  }
}

export async function signIn(
  email: string,
  password: string,
): Promise<{ error?: string }> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    void logLoginAttempt({ success: false, email, failure_reason: error.message });
    return { error: error.message };
  }

  if (data.user) {
    void logLoginAttempt({ success: true, userId: data.user.id, email: data.user.email ?? email });
  }

  return {};
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  // Supabase env vars may be absent (lazy client throws on first touch).
  // Treat "not configured" as "no session" so route guards fall through
  // to the login page instead of crashing into an error boundary.
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch (err) {
    console.error("getSession: Supabase unavailable —", err);
    return null;
  }
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("getProfile failed:", error.message);
    return null;
  }
  return data ?? null;
}

/**
 * True if the profile's role is at least the requested role.
 * Hierarchy: owner > admin > editor.
 */
export function requireRole(profile: Profile | null, role: AdminRole): boolean {
  if (!profile || !profile.is_active) return false;
  const have = ROLE_RANK[profile.role as AdminRole];
  const need = ROLE_RANK[role];
  return typeof have === "number" && typeof need === "number" && have >= need;
}

export type { AdminRole, Profile, Session } from "./types";
