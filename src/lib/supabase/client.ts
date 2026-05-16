/**
 * Browser-safe Supabase client.
 *
 * Uses the public anon key. Safe to import from React components,
 * route loaders, and any client-side code.
 *
 * Why a getter instead of a top-level `createClient` call:
 * the public site must keep rendering even when Supabase env vars are
 * absent (only the admin area needs them). A bare top-level
 * `createClient` + throw would crash every page at import. So we defer
 * client creation to first use via `getSupabase()`.
 *
 * IMPORTANT: this returns a *real* SupabaseClient instance (not a Proxy).
 * An earlier Proxy-based approach broke auth-token attachment on
 * PostgREST requests, causing logged-in queries to run as `anon` and
 * RLS to block them. Always go through `getSupabase()`.
 *
 * For server-side privileged operations (e.g. inside /api/*), import
 * `supabaseAdmin` from './admin' instead.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let cached: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (cached) return cached;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to use the admin area.",
    );
  }

  cached = createClient<Database>(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: "webcore-admin-auth",
    },
  });
  return cached;
}

/**
 * Back-compat lazy accessor. Existing code does `import { supabase }`
 * and calls `supabase.from(...)` / `supabase.auth...`. We keep that API
 * but resolve to the real client on each access so the underlying
 * instance (and its session) is always the genuine one.
 */
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_t, prop) {
    const client = getSupabase();
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function"
      ? (value as (...a: unknown[]) => unknown).bind(client)
      : value;
  },
});
