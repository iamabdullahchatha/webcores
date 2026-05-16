/**
 * Server-only Supabase client with service-role privileges.
 *
 * ⚠️ NEVER import this file from src/routes/, src/components/, or any
 * other browser-side code. Vite will bundle it into the client and
 * leak the service-role key.
 *
 * Allowed callers:
 *   - api/*.js / api/*.ts  (Vercel serverless functions)
 *   - scripts/*.mjs        (build-time / one-shot scripts)
 *
 * The service-role key bypasses Row Level Security entirely. Use it
 * only for trusted server-side operations.
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const url = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    "Supabase admin env vars missing. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the server environment.",
  );
}

export const supabaseAdmin = createClient<Database>(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
