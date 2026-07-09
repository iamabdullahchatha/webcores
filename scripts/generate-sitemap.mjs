// Regenerates public/sitemap.xml from the database at build time.
//
// Why this exists: public/sitemap.xml used to carry hardcoded blog slugs that
// went stale — new CMS posts never appeared, and unpublished/deleted posts were
// never removed. This script rewrites ONLY the /blog/{slug} entries from the
// live blog_posts table, leaving every other URL (core, services, GEO, blog
// index) exactly as authored.
//
// Run it BEFORE `vite build` so the fresh public/ file gets copied into dist/.
// scripts/prerender.mjs then reads this same file as its source of truth.
//
// Fail-open: any Supabase problem logs a warning and exits 0, so the build
// continues using whatever sitemap is already on disk.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
const SITE_URL = "https://webcoreuae.com";

// Matches a single-line <url>…</url> entry whose <loc> is a blog POST
// (i.e. /blog/<slug>). The blog index (/blog with no trailing slug) does not
// contain "/blog/" and is therefore preserved.
const BLOG_POST_LINE = /^[ \t]*<url><loc>https?:\/\/[^<]*\/blog\/[^<]+<\/loc>.*<\/url>[ \t]*\r?\n?/gim;

function warnAndExitOk(message) {
  console.warn(`⚠️  Sitemap not regenerated: ${message} — keeping existing sitemap.`);
  process.exit(0);
}

// src/lib/seo.ts is the single source of truth for each static page's
// last-modified date (the app renders these same dates in its JSON-LD). This
// script runs under plain `node`, which can't import a .ts file, so we read
// seo.ts as text and extract the two literals we need:
//   • pageDates  → key → dateModified
//   • seoRoutes  → key → path
// and combine them into a path → date map. If anything fails to parse we fall
// back to leaving the existing <lastmod> values untouched (fail-open).
async function readStaticDates() {
  const byPath = new Map();
  try {
    const seoText = await readFile(path.join(rootDir, "src", "lib", "seo.ts"), "utf8");

    const dateByKey = new Map();
    const dateRe =
      /(\w+):\s*\{\s*datePublished:\s*"[^"]*",\s*dateModified:\s*"(\d{4}-\d{2}-\d{2})"\s*\}/g;
    for (const m of seoText.matchAll(dateRe)) dateByKey.set(m[1], m[2]);

    const routeRe = /\{\s*key:\s*"(\w+)",\s*path:\s*"([^"]*)"\s*\}/g;
    for (const m of seoText.matchAll(routeRe)) {
      const date = dateByKey.get(m[1]);
      if (date) byPath.set(m[2], date);
    }
  } catch (err) {
    console.warn(
      `⚠️  Could not derive static dates from seo.ts (${err?.message ?? err}) — leaving <lastmod> values as authored.`,
    );
  }
  return byPath;
}

// Resolve Supabase creds from process.env (covers `node --env-file=.env` and
// shell-exported vars) and fall back to parsing .env directly so the script
// works regardless of how it is invoked.
async function readSupabaseEnv() {
  let url = process.env.VITE_SUPABASE_URL;
  let key = process.env.VITE_SUPABASE_ANON_KEY;
  if (url && key) return { url, key };

  try {
    const envText = await readFile(path.join(rootDir, ".env"), "utf8");
    for (const line of envText.split(/\r?\n/)) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (!m) continue;
      const val = m[2].replace(/^["']|["']$/g, "");
      if (m[1] === "VITE_SUPABASE_URL" && !url) url = val;
      if (m[1] === "VITE_SUPABASE_ANON_KEY" && !key) key = val;
    }
  } catch {
    /* no .env file — env must be injected by the CI/host environment */
  }

  return { url, key };
}

const { url: supabaseUrl, key: supabaseAnonKey } = await readSupabaseEnv();

if (!supabaseUrl || !supabaseAnonKey) {
  warnAndExitOk("VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set");
}

// Fetch published posts.
let posts = [];
try {
  const db = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await db
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  if (error) warnAndExitOk(`Supabase query failed — ${error.message}`);
  posts = data ?? [];
} catch (err) {
  warnAndExitOk(`could not connect to Supabase — ${err?.message ?? err}`);
}

// Read the current sitemap (this file is the thing we rewrite).
let sitemap;
try {
  sitemap = await readFile(sitemapPath, "utf8");
} catch (err) {
  warnAndExitOk(`could not read ${path.relative(rootDir, sitemapPath)} — ${err?.message ?? err}`);
}

const today = new Date().toISOString().slice(0, 10);

// Build fresh blog entries from the DB.
const blogEntries = posts
  .filter((p) => p.slug)
  .map((p) => {
    const lastmod = p.updated_at ? String(p.updated_at).slice(0, 10) : today;
    return `  <url><loc>${SITE_URL}/blog/${p.slug}</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority><changefreq>monthly</changefreq></url>`;
  })
  .join("\n");

// Strip every existing blog-post line, then re-insert the fresh block just
// before </urlset>. All non-blog URLs are preserved (their <lastmod> values are
// resynced from seo.ts below).
const withoutBlog = sitemap.replace(BLOG_POST_LINE, "");
const staticCount = (withoutBlog.match(/<loc>/g) ?? []).length;

// Resync the <lastmod> of each remaining (static) URL from seo.ts. The blog
// index (/blog) has no pageDates entry — it changes whenever a post is added,
// so it always reflects the current build date.
const staticDates = await readStaticDates();
const resynced = withoutBlog.replace(
  /(<url><loc>)(https?:\/\/[^<]+)(<\/loc><lastmod>)(\d{4}-\d{2}-\d{2})(<\/lastmod>)/g,
  (full, open, loc, mid, _oldDate, close) => {
    let pathname;
    try {
      pathname = new URL(loc).pathname;
    } catch {
      return full;
    }
    if (pathname.length > 1 && pathname.endsWith("/")) pathname = pathname.slice(0, -1);
    if (pathname === "/blog") return `${open}${loc}${mid}${today}${close}`;
    const date = staticDates.get(pathname);
    return date ? `${open}${loc}${mid}${date}${close}` : full;
  },
);

const updated = resynced.replace(
  /([ \t]*)<\/urlset>/,
  (_m, indent) => `${blogEntries ? blogEntries + "\n" : ""}${indent}</urlset>`,
);

await writeFile(sitemapPath, updated, "utf8");
console.log(`✅ Sitemap updated: ${staticCount} static URLs + ${posts.length} blog posts`);
