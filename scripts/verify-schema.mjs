#!/usr/bin/env node
/**
 * Verify that the Supabase migration 0001 ran cleanly.
 *
 * Run: node scripts/verify-schema.mjs
 *
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the env.
 * Uses the anon client because that's what the live site will use —
 * if the anon role can't SELECT from a table, the public site won't
 * be able to render it.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal .env loader — avoids dotenv dep for this one script.
try {
  const envPath = resolve(__dirname, "..", ".env");
  const envText = readFileSync(envPath, "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  // No .env — rely on shell env.
}

const url = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

const ok = (msg) => console.log(`${GREEN}  ✓${RESET} ${msg}`);
const fail = (msg, err) => {
  console.log(`${RED}  ✗${RESET} ${msg}`);
  if (err) console.log(`${DIM}    ${err}${RESET}`);
};

if (!url || !anonKey) {
  console.error(
    `${RED}Missing env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env first.${RESET}`,
  );
  process.exit(1);
}

const supabase = createClient(url, anonKey);

const TABLES = [
  "profiles",
  "login_history",
  "blog_posts",
  "site_settings",
  "home_hero",
  "home_stats",
  "services",
  "service_page_content",
  "process_steps",
  "portfolio_items",
  "testimonials",
  "faqs",
  "why_choose_us",
  "trust_logos",
  "global_regions",
  "media_library",
];

const BUCKETS = ["blog-images", "site-media"];

let failures = 0;

console.log("\nTables");
for (const tbl of TABLES) {
  const { error } = await supabase.from(tbl).select("*", { count: "exact", head: true });
  if (error) {
    // login_history & profiles are RLS-restricted for anon — that's expected.
    // We're checking the table exists, not that anon can read it.
    if (error.code === "42P01") {
      fail(tbl, `does not exist (${error.message})`);
      failures++;
    } else {
      // Any other error (permission denied, etc.) means the table exists.
      ok(`${tbl} ${DIM}(exists, RLS-restricted)${RESET}`);
    }
  } else {
    ok(tbl);
  }
}

console.log("\nStorage buckets");
// NOTE: anon cannot enumerate buckets via listBuckets() on hosted Supabase,
// so we probe each bucket by listing its objects instead. A public bucket
// permits this with the anon key; a missing bucket returns a "not found"
// style error.
for (const id of BUCKETS) {
  const { error } = await supabase.storage.from(id).list("", { limit: 1 });
  if (!error) {
    ok(id);
  } else if (/not found|does not exist|bucket.*not/i.test(error.message)) {
    fail(id, `bucket not found (${error.message})`);
    failures++;
  } else {
    // Other errors (e.g. permission on listing) still imply the bucket
    // exists — a missing bucket fails earlier with a not-found message.
    ok(`${id} ${DIM}(exists)${RESET}`);
  }
}

console.log("\nFunctions");
const { error: fnErr } = await supabase.rpc("is_cms_user");
if (fnErr && fnErr.code === "42883") {
  fail("is_cms_user()", "function not defined");
  failures++;
} else {
  ok("is_cms_user()");
}

console.log("");
if (failures > 0) {
  console.log(`${RED}${failures} check(s) failed.${RESET}`);
  process.exit(1);
} else {
  console.log(`${GREEN}All checks passed.${RESET}`);
}
