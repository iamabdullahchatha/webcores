#!/usr/bin/env node
/**
 * Create the initial CMS owner account.
 *
 * Reads env: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FULL_NAME
 * Also needs: VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (from .env)
 *
 * Run once:
 *   ADMIN_EMAIL=you@example.com \
 *   ADMIN_PASSWORD=YourStrongPassword \
 *   ADMIN_FULL_NAME='Your Name' \
 *   node scripts/create-owner.mjs
 *
 * If the user already exists, the script reports it and exits 0.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal .env loader.
try {
  const envText = readFileSync(resolve(__dirname, "..", ".env"), "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* rely on shell env */
}

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

const required = {
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_FULL_NAME: process.env.ADMIN_FULL_NAME,
  VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

const missing = Object.entries(required)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length) {
  console.error(`${RED}Missing required env vars:${RESET} ${missing.join(", ")}`);
  process.exit(1);
}

const admin = createClient(required.VITE_SUPABASE_URL, required.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Helper: find existing user by email (paginated through admin.listUsers).
async function findUserByEmail(email) {
  const lowerEmail = email.toLowerCase();
  let page = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const found = data.users.find((u) => u.email?.toLowerCase() === lowerEmail);
    if (found) return found;
    if (data.users.length < 200) return null;
    page++;
  }
}

try {
  const existing = await findUserByEmail(required.ADMIN_EMAIL);
  if (existing) {
    console.log(
      `${YELLOW}User already exists.${RESET} User ID: ${existing.id} — nothing to do.`,
    );
    process.exit(0);
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: required.ADMIN_EMAIL,
    password: required.ADMIN_PASSWORD,
    email_confirm: true,
    app_metadata: { role: "owner" },
    user_metadata: { full_name: required.ADMIN_FULL_NAME },
  });

  if (error) {
    console.error(`${RED}Failed to create user:${RESET} ${error.message}`);
    process.exit(1);
  }

  const userId = data.user.id;

  const { error: profileError } = await admin.from("profiles").insert({
    id: userId,
    email: required.ADMIN_EMAIL,
    full_name: required.ADMIN_FULL_NAME,
    role: "owner",
    is_active: true,
  });

  if (profileError) {
    // Auth user was created but profile insert failed — leave the auth user
    // in place so a re-run picks it up. Log clearly.
    console.error(
      `${RED}Auth user created but profile insert failed:${RESET} ${profileError.message}`,
    );
    console.error(
      `${YELLOW}Auth user ID:${RESET} ${userId} — fix the profile insert manually or rerun.`,
    );
    process.exit(1);
  }

  console.log(`${GREEN}Owner created.${RESET} User ID: ${userId}`);
  console.log(`${YELLOW}Reminder:${RESET} clear ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FULL_NAME from your shell history.`);
} catch (err) {
  console.error(`${RED}Unexpected error:${RESET}`, err);
  process.exit(1);
}
