import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createClient } from "@supabase/supabase-js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const ssrDir = path.join(rootDir, ".seo-server");
const templatePath = path.join(distDir, "index.html");
const serverEntry = path.join(ssrDir, "entry-server.js");

const { renderRoute, getRouteHead, seoRoutes } = await import(pathToFileURL(serverEntry).href);
const template = await readFile(templatePath, "utf8");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeJson(value) {
  return value.replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
}

function normalizeAttrName(name) {
  if (name === "hrefLang") return "hreflang";
  if (name === "className") return "class";
  return name;
}

function renderAttrs(attrs) {
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([name, value]) => {
      const attrName = normalizeAttrName(name);
      return value === true ? ` ${attrName}` : ` ${attrName}="${escapeHtml(value)}"`;
    })
    .join("");
}

function renderHeadTag(entry) {
  if ("title" in entry) {
    return `<title>${escapeHtml(entry.title)}</title>`;
  }

  if ("script:ld+json" in entry) {
    return `<script type="application/ld+json">${escapeJson(JSON.stringify(entry["script:ld+json"]))}</script>`;
  }

  return `<meta${renderAttrs(entry)}>`;
}

function renderHead(key) {
  const head = getRouteHead(key);
  const tags = [
    ...head.meta.map(renderHeadTag),
    ...head.links.map((link) => `<link${renderAttrs(link)}>`),
  ];

  return tags.join("\n    ");
}

function injectRouteHtml(html, rootHtml, headHtml) {
  return html
    .replace(/<head>([\s\S]*?)<\/head>/i, (_match, inner) => `<head>${inner}\n    ${headHtml}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${rootHtml}</div>`);
}

function outputPathForRoute(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  const segments = routePath.replace(/^\/+|\/+$/g, "").split("/");
  return path.join(distDir, ...segments, "index.html");
}

// ── Static (known) routes ────────────────────────────────────────────────────
for (const route of seoRoutes) {
  const html = injectRouteHtml(template, await renderRoute(route.path), renderHead(route.key));
  const outputPath = outputPathForRoute(route.path);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
  console.log(`prerendered ${route.path} -> ${path.relative(rootDir, outputPath)}`);
}

// ── Blog post prerender ──────────────────────────────────────────────────────
// Fetch all published blog posts from Supabase at build time and generate a
// static HTML shell for each slug so Googlebot receives HTTP 200 (not 404).
// The page hydrates normally in the browser and replaces content with live data.

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

let blogPosts = [];

if (supabaseUrl && supabaseAnonKey) {
  try {
    const db = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await db
      .from("blog_posts")
      .select("slug, title, excerpt, seo_title, seo_description, cover_image_url, published_at, tags")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) {
      console.warn(`blog prerender: Supabase query failed — ${error.message}`);
    } else {
      blogPosts = data ?? [];
      console.log(`blog prerender: fetched ${blogPosts.length} published posts from Supabase`);
    }
  } catch (err) {
    console.warn(`blog prerender: could not connect to Supabase — ${err.message}`);
  }
} else {
  console.warn("blog prerender: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set — skipping blog slug prerender");
}

const SITE_URL = "https://www.webcoreuae.com";

function buildBlogPostHead(post) {
  const title = post.seo_title ?? `${post.title} | Webcore Solutions`;
  const description =
    post.seo_description ??
    post.excerpt ??
    "Webcore Solutions publishes practical insights on web development, software engineering, SEO, GEO and digital growth for Dubai and global teams.";
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.cover_image_url ?? `${SITE_URL}/og-image.png`;

  const meta = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:site_name" content="Webcore Solutions">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta property="og:image" content="${escapeHtml(ogImage)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:site" content="@webcoresolutions">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
  ];

  if (post.published_at) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.seo_description ?? post.excerpt ?? undefined,
      image: post.cover_image_url ?? undefined,
      datePublished: post.published_at,
      author: { "@type": "Organization", name: "Webcore Solutions" },
      publisher: { "@type": "Organization", name: "Webcore Solutions", url: SITE_URL },
      mainEntityOfPage: canonical,
    };
    meta.push(
      `<script type="application/ld+json">${escapeJson(JSON.stringify(articleSchema))}</script>`,
    );
  }

  return meta.join("\n    ");
}

const today = new Date().toISOString().slice(0, 10);

for (const post of blogPosts) {
  const routePath = `/blog/${post.slug}`;
  const shellHtml = await renderRoute(routePath);
  const headHtml = buildBlogPostHead(post);
  const html = injectRouteHtml(template, shellHtml, headHtml);
  const outputPath = outputPathForRoute(routePath);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
  console.log(`prerendered ${routePath} -> ${path.relative(rootDir, outputPath)}`);
}

// ── Sitemap regeneration ─────────────────────────────────────────────────────
// Read the static sitemap from public/ and append all blog post URLs.
// The result is written to dist/sitemap.xml (served at /sitemap.xml by Vercel).

const staticSitemap = await readFile(path.join(rootDir, "public", "sitemap.xml"), "utf8");

const blogEntries = blogPosts
  .map((post) => {
    const lastmod = post.published_at ? post.published_at.slice(0, 10) : today;
    return `  <url><loc>${SITE_URL}/blog/${post.slug}</loc><lastmod>${lastmod}</lastmod><priority>0.7</priority><changefreq>monthly</changefreq></url>`;
  })
  .join("\n");

const updatedSitemap = staticSitemap.replace(
  "</urlset>",
  `${blogEntries ? blogEntries + "\n" : ""}</urlset>`,
);

await writeFile(path.join(distDir, "sitemap.xml"), updatedSitemap, "utf8");
console.log(`wrote dist/sitemap.xml with ${blogPosts.length} blog post URLs`);

// ── Vercel SPA fallback ───────────────────────────────────────────────────────
// Serves index.html for any unmatched route (e.g. /admin/login).
await writeFile(path.join(distDir, "404.html"), template, "utf8");
console.log("wrote dist/404.html (Vercel SPA fallback)");

await rm(ssrDir, { recursive: true, force: true });
