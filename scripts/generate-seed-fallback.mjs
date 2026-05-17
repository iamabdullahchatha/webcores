// Build-time generator: parses the canonical Supabase seed SQL into a static
// TypeScript fallback module. This lets the prerender (and first client paint)
// render the SAME content the database serves, so SEO crawlers see real
// markup instead of a loading skeleton. The live Supabase data still wins at
// runtime — this only fills the SSR / loading gap. No backend code is touched;
// the seed SQL is read-only input here.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const serviceSeed = path.join(rootDir, "supabase", "seeds", "0004_service_pages_seed.sql");
const blogSeed = path.join(rootDir, "supabase", "seeds", "0002_blog_seed.sql");
const outFile = path.join(rootDir, "src", "lib", "content", "seedFallback.generated.ts");

/* ── Minimal SQL-literal aware tokenizer ────────────────────────────────────
 * Handles: single-quoted strings ('' escape), dollar-quoted strings ($tag$),
 * numbers, booleans, NULL, ARRAY[...] and opaque expressions (now() - interval
 * 'N days'). Enough to read the regular INSERT ... VALUES tuples in our seeds.
 */

function scanTuples(sql, fromIndex) {
  const tuples = [];
  let i = fromIndex;
  const n = sql.length;

  const skipWs = () => {
    while (i < n && /\s/.test(sql[i])) i++;
  };

  while (i < n) {
    skipWs();
    if (i >= n) break;
    if (sql[i] === ";") break;
    if (/^on\s+conflict/i.test(sql.slice(i, i + 12))) break;
    if (sql[i] === ",") {
      i++;
      continue;
    }
    if (sql[i] !== "(") break;

    // Read one balanced (...) tuple, honoring strings/dollar-quotes.
    let depth = 0;
    const start = i;
    while (i < n) {
      const ch = sql[i];
      if (ch === "'") {
        i++;
        while (i < n) {
          if (sql[i] === "'") {
            if (sql[i + 1] === "'") {
              i += 2;
              continue;
            }
            i++;
            break;
          }
          i++;
        }
        continue;
      }
      if (ch === "$") {
        const m = /^\$[A-Za-z0-9_]*\$/.exec(sql.slice(i));
        if (m) {
          const tag = m[0];
          const end = sql.indexOf(tag, i + tag.length);
          i = end === -1 ? n : end + tag.length;
          continue;
        }
      }
      if (ch === "(") depth++;
      else if (ch === ")") {
        depth--;
        if (depth === 0) {
          i++;
          tuples.push(sql.slice(start + 1, i - 1));
          break;
        }
      }
      i++;
    }
  }
  return tuples;
}

function splitFields(tuple) {
  const fields = [];
  let buf = "";
  let paren = 0;
  let bracket = 0;
  let i = 0;
  const n = tuple.length;
  while (i < n) {
    const ch = tuple[i];
    if (ch === "'") {
      buf += ch;
      i++;
      while (i < n) {
        buf += tuple[i];
        if (tuple[i] === "'") {
          if (tuple[i + 1] === "'") {
            buf += tuple[i + 1];
            i += 2;
            continue;
          }
          i++;
          break;
        }
        i++;
      }
      continue;
    }
    if (ch === "$") {
      const m = /^\$[A-Za-z0-9_]*\$/.exec(tuple.slice(i));
      if (m) {
        const tag = m[0];
        const end = tuple.indexOf(tag, i + tag.length);
        const stop = end === -1 ? n : end + tag.length;
        buf += tuple.slice(i, stop);
        i = stop;
        continue;
      }
    }
    if (ch === "(") paren++;
    else if (ch === ")") paren--;
    else if (ch === "[") bracket++;
    else if (ch === "]") bracket--;
    if (ch === "," && paren === 0 && bracket === 0) {
      fields.push(buf.trim());
      buf = "";
      i++;
      continue;
    }
    buf += ch;
    i++;
  }
  if (buf.trim()) fields.push(buf.trim());
  return fields;
}

function unescapeSqlString(s) {
  return s.replace(/''/g, "'");
}

function interpretField(tok) {
  const t = tok.trim();
  if (t === "" ) return null;
  if (/^null$/i.test(t)) return null;
  if (/^true$/i.test(t)) return true;
  if (/^false$/i.test(t)) return false;
  if (/^-?\d+(\.\d+)?$/.test(t)) return Number(t);

  if (t[0] === "'") {
    // read the quoted string, then look for an optional ::cast
    let i = 1;
    let val = "";
    while (i < t.length) {
      if (t[i] === "'") {
        if (t[i + 1] === "'") {
          val += "'";
          i += 2;
          continue;
        }
        i++;
        break;
      }
      val += t[i];
      i++;
    }
    const rest = t.slice(i).trim();
    if (/^::\s*jsonb?/i.test(rest) || (val.trim()[0] === "{" || val.trim()[0] === "[")) {
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    }
    return val;
  }

  if (t[0] === "$") {
    const m = /^\$[A-Za-z0-9_]*\$/.exec(t);
    if (m) {
      const tag = m[0];
      const end = t.indexOf(tag, tag.length);
      return end === -1 ? t.slice(tag.length) : t.slice(tag.length, end);
    }
  }

  if (/^array\s*\[/i.test(t)) {
    const inner = t.slice(t.indexOf("[") + 1, t.lastIndexOf("]"));
    return splitFields(inner).map((x) => {
      const v = x.trim();
      return v[0] === "'" ? unescapeSqlString(v.slice(1, -1)) : v;
    });
  }

  // Opaque expression — e.g. now() - interval '5 days'
  const iv = /interval\s+'(\d+)\s+days?'/i.exec(t);
  if (/now\s*\(\)/i.test(t) && iv) {
    const days = Number(iv[1]);
    return new Date(Date.now() - days * 86400000).toISOString();
  }
  if (/now\s*\(\)/i.test(t)) return new Date().toISOString();
  return null;
}

function parseInsert(sql, table) {
  const re = new RegExp(
    `INSERT\\s+INTO\\s+public\\.${table}\\s*\\(([^)]*)\\)\\s*VALUES`,
    "gi",
  );
  const rows = [];
  let m;
  while ((m = re.exec(sql))) {
    const columns = m[1].split(",").map((c) => c.trim());
    const tuples = scanTuples(sql, re.lastIndex);
    for (const tup of tuples) {
      const fields = splitFields(tup).map(interpretField);
      const row = {};
      columns.forEach((col, idx) => {
        row[col] = fields[idx];
      });
      rows.push(row);
    }
  }
  return rows;
}

/* ── Build the fallback structures ─────────────────────────────────────── */

const serviceSql = await readFile(serviceSeed, "utf8");
const blogSql = await readFile(blogSeed, "utf8");

const serviceParents = parseInsert(serviceSql, "services");
const sectionRows = parseInsert(serviceSql, "service_page_content");

const serviceFallback = {};
for (const svc of serviceParents) {
  serviceFallback[svc.slug] = {
    service: {
      ...svc,
      seo_title: null,
      seo_description: null,
    },
    sections: [],
  };
}

for (const sec of sectionRows) {
  const slug = sec.service_slug;
  if (!serviceFallback[slug]) {
    serviceFallback[slug] = { service: { slug, seo_title: null, seo_description: null }, sections: [] };
  }
  if (sec.is_visible === false) continue;
  serviceFallback[slug].sections.push({
    id: `${slug}:${sec.section_type}:${sec.sort_order}`,
    service_slug: slug,
    section_type: sec.section_type,
    heading: sec.heading ?? null,
    subheading: sec.subheading ?? null,
    body: sec.body ?? null,
    data_json: sec.data_json ?? {},
    sort_order: sec.sort_order ?? 0,
    is_visible: true,
  });
}
for (const slug of Object.keys(serviceFallback)) {
  serviceFallback[slug].sections.sort((a, b) => a.sort_order - b.sort_order);
}

const blogRows = parseInsert(blogSql, "blog_posts");
const blogFallback = blogRows
  .filter((r) => r.status === "published")
  .map((r) => ({
    id: r.slug,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? null,
    cover_image_url: r.cover_image_url ?? null,
    cover_image_alt: r.cover_image_alt ?? null,
    tags: Array.isArray(r.tags) ? r.tags : null,
    reading_time_min: typeof r.reading_time_min === "number" ? r.reading_time_min : null,
    // published_at left null on purpose: avoids SSR/client locale-format
    // hydration drift; the live fetch supplies the real date post-mount.
    published_at: null,
  }));

// Full-post fallback keyed by slug — used by blog.$slug route so individual
// post pages render without a live Supabase hit (mirrors listing page pattern).
const blogPostFallbackMap = {};
for (const r of blogRows.filter((r) => r.status === "published")) {
  blogPostFallbackMap[r.slug] = {
    id: r.slug,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? null,
    content: r.content ?? null,
    cover_image_url: r.cover_image_url ?? null,
    cover_image_alt: r.cover_image_alt ?? null,
    tags: Array.isArray(r.tags) ? r.tags : null,
    reading_time_min: typeof r.reading_time_min === "number" ? r.reading_time_min : null,
    published_at: null,
    seo_title: r.seo_title ?? null,
    seo_description: r.seo_description ?? null,
  };
}

/* ── Emit the generated module ─────────────────────────────────────────── */

const sectionCount = Object.values(serviceFallback).reduce((a, s) => a + s.sections.length, 0);
if (Object.keys(serviceFallback).length < 6 || sectionCount < 40) {
  throw new Error(
    `Seed parse looks wrong: ${Object.keys(serviceFallback).length} services, ${sectionCount} sections`,
  );
}
// blogFallback may be empty when posts are managed via Supabase admin only

const banner = `// AUTO-GENERATED by scripts/generate-seed-fallback.mjs — DO NOT EDIT.
// Source: supabase/seeds/0004_service_pages_seed.sql + 0002_blog_seed.sql
// Regenerated on every build. This is SSR/loading fallback content only;
// live Supabase data replaces it at runtime.
`;

const body = `${banner}
import type { ServicePage } from "./useServicePage";

export type BlogFallbackPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  tags: string[] | null;
  reading_time_min: number | null;
  published_at: string | null;
};

export type BlogFallbackFullPost = BlogFallbackPost & {
  content: string | null;
  seo_title: string | null;
  seo_description: string | null;
};

export const serviceFallback = ${JSON.stringify(serviceFallback, null, 2)} as unknown as Record<string, ServicePage>;

export const blogFallback: BlogFallbackPost[] = ${JSON.stringify(blogFallback, null, 2)};

export const blogPostFallback: Record<string, BlogFallbackFullPost> = ${JSON.stringify(blogPostFallbackMap, null, 2)};
`;

await writeFile(outFile, body, "utf8");
console.log(
  `generated ${path.relative(rootDir, outFile)} — ${Object.keys(serviceFallback).length} services, ${sectionCount} sections, ${blogFallback.length} blog posts`,
);
