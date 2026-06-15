import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createClient } from "@supabase/supabase-js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const ssrDir = path.join(rootDir, ".seo-server");
const templatePath = path.join(distDir, "index.html");
const serverEntry = path.join(ssrDir, "entry-server.js");

const { renderRoute, getRouteHead, seoRoutes } = await import(pathToFileURL(serverEntry).href);

// Vite only emits modulepreload hints for chunks in the home route's static
// import graph, so route-only named manualChunks (date-fns, zod, ui-utils) are
// absent from the document <head>. Preload every named chunk that exists in the
// build so first navigation to those routes warms the chunk earlier. Filenames
// are content-hashed, so we discover them from dist/assets rather than hardcode.
async function addNamedChunkPreloads(html) {
  const namedChunks = ["framer", "icons", "supabase", "date-fns", "zod", "ui-utils"];
  const assetFiles = await readdir(path.join(distDir, "assets"));
  const tags = [];
  for (const name of namedChunks) {
    const file = assetFiles.find(
      (f) => f === `${name}.js` || (f.startsWith(`${name}-`) && f.endsWith(".js")),
    );
    if (!file) continue;
    const href = `/assets/${file}`;
    if (html.includes(`href="${href}"`)) continue; // already preloaded by Vite
    tags.push(`<link rel="modulepreload" crossorigin href="${href}">`);
  }
  if (!tags.length) return html;
  const block = tags.join("\n    ");
  // Group them with the Vite-emitted modulepreload block, before the stylesheet.
  if (/<link rel="stylesheet"[^>]*>/i.test(html)) {
    return html.replace(/(<link rel="stylesheet"[^>]*>)/i, `${block}\n    $1`);
  }
  return html.replace(/<\/head>/i, `    ${block}\n  </head>`);
}

const template = await addNamedChunkPreloads(await readFile(templatePath, "utf8"));

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

function injectRouteHtml(html, rootHtml, headHtml, seed) {
  // Inline only THIS page's seed slice as JSON so the client can hydrate the
  // prerendered content synchronously without shipping seedFallback.generated.
  const seedScript = seed
    ? `<script id="__page_seed__" type="application/json">${escapeJson(JSON.stringify(seed))}</script>`
    : "";
  return html
    .replace(/<head>([\s\S]*?)<\/head>/i, (_match, inner) => `<head>${inner}\n    ${headHtml}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${rootHtml}</div>${seedScript}`);
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
  const headHtml = insertHreflangTags(route.path, renderHead(route.key));
  const { html: rootHtml, seed } = await renderRoute(route.path);
  const html = injectRouteHtml(template, rootHtml, headHtml, seed);
  const outputPath = outputPathForRoute(route.path);

  validateHreflang(route.path, html);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
  console.log(`prerendered ${route.path} -> ${path.relative(rootDir, outputPath)}`);
}

// ── Blog post prerender ──────────────────────────────────────────────────────
// Fetch all published blog posts from Supabase at build time and generate a
// static HTML shell for each slug so Googlebot receives HTTP 200 (not 404).
// The page hydrates normally in the browser and replaces content with live data.

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
    /* env must be injected; build still succeeds without blog prerender */
  }

  return { url, key };
}

const { url: supabaseUrl, key: supabaseAnonKey } = await readSupabaseEnv();

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

function getCanonicalUrl(route) {
  const base = "https://www.webcoreuae.com";
  if (route === "/") return base + "/";
  return base + route.replace(/\/+$/g, "");
}

function buildHreflangTags(canonicalUrl) {
  const tags = [
    `<link rel="alternate" hreflang="en-AE" href="${canonicalUrl}" />`,
    `<link rel="alternate" hreflang="en-GB" href="${canonicalUrl}" />`,
    `<link rel="alternate" hreflang="en-US" href="${canonicalUrl}" />`,
    `<link rel="alternate" hreflang="en-PK" href="${canonicalUrl}" />`,
    `<link rel="alternate" hreflang="en" href="${canonicalUrl}" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`,
  ];
  return tags.join("\n    ");
}

function insertHreflangTags(route, headHtml) {
  const canonicalPattern = /(<link\s+rel="canonical"\s+href="[^"]+"\s*\/?>)/i;

  if (!canonicalPattern.test(headHtml)) {
    console.error(`FATAL: ${route} is missing a canonical tag`);
    process.exit(1);
  }

  // App routes already emit the canonical hreflang set during SSR (see
  // src/lib/seo.ts). Only inject for heads that lack them — e.g. blog posts
  // built via buildBlogPostHead — so we never double up to 11 tags.
  if (/hreflang=/i.test(headHtml)) {
    return headHtml;
  }

  const hreflangTags = buildHreflangTags(getCanonicalUrl(route));
  return headHtml.replace(canonicalPattern, `$1\n    ${hreflangTags}`);
}

function validateHreflang(route, html) {
  const hreflangMatches = html.match(/hreflang=/g) || [];
  if (hreflangMatches.length !== 6) {
    console.error(`FATAL: ${route} has ${hreflangMatches.length} hreflang tags, expected 6`);
    process.exit(1);
  }

  const expectedUrl = getCanonicalUrl(route);
  if (!html.includes(`hreflang="x-default" href="${expectedUrl}"`)) {
    console.error(`FATAL: ${route} x-default hreflang does not match canonical`);
    process.exit(1);
  }
}

const blogPostMetaDescriptions = {
  "how-to-build-7-figure-ecommerce-store-from-scratch":
    "Learn how to plan, brand, launch and scale a 7-figure ecommerce store for Europe markets, from niche validation to traffic and email. Explore our work.",
  "why-smart-businesses-dont-wing-their-tech-decisions":
    "See how IT consultation helps Pakistan businesses audit tools, reduce risk, choose vendors and plan smarter technology decisions. Get in touch today.",
  "how-to-protect-your-business-website-from-hackers":
    "Protect your Gulf region business website with SSL, firewalls, backups, malware scans, monitoring, passwords and safer team habits. Request a free quote.",
  "ai-agents-for-business-automate-sales-support-operations":
    "Discover how AI agents automate sales follow-ups, support, HR, lead routing and operations for UAE companies without extra hiring. Book a free consultation.",
  "bilingual-arabic-english-seo-strategy":
    "Understand bilingual Arabic-English SEO for Dubai audiences, from search intent and translation gaps to technical setup. Start your project today.",
  "headless-cms-vs-traditional-cms":
    "Compare headless CMS and traditional CMS choices for UK teams weighing speed, editing workflows, integrations and future scale. See how we can help.",
  "claude-vs-chatgpt-codex-which-ai-coding-tool-is-better":
    "Compare Claude and ChatGPT Codex for Europe developers and teams choosing AI coding support for real software projects in 2026. Learn how we do it.",
  "why-every-growing-business-needs-a-professional-website":
    "Learn why Pakistan businesses need a professional website for trust, leads, Google visibility, performance and long-term growth. Explore our work.",
  "top-ai-tools-for-business-success":
    "Explore AI tools that help Gulf region businesses improve content, design, productivity, customer support and daily operations. Get in touch today.",
  "custom-website-vs-wordpress-which-is-better":
    "Compare custom websites and WordPress for UAE businesses choosing between control, speed, security, scalability and budget. Request a free quote.",
  "generative-engine-optimization-2026":
    "Understand GEO for Dubai brands in 2026 and how AI engines choose, cite and trust business content across search experiences. Book a free consultation.",
  "headless-commerce-vs-shopify-2026":
    "Use a practical framework for UK ecommerce teams choosing between headless commerce and Shopify based on your growth stage. Start your project today.",
  "why-your-dubai-website-isnt-getting-leads":
    "Find why your Dubai website is not generating leads and what to fix across messaging, speed, SEO, trust, calls and conversion. See how we can help.",
  "how-to-make-your-website-appear-in-chatgpt-gemini-ai-search":
    "Learn how Europe businesses can appear in ChatGPT, Gemini and AI search through clearer answers, entities and trusted citations. Learn how we do it.",
  "essential-features-high-performing-business-website":
    "Review the website features Pakistan businesses need for speed, trust, mobile usability, security, analytics, forms and conversions. Explore our work.",
  "what-is-vibe-coding-complete-beginners-guide-2026":
    "Understand vibe coding, AI builders, prompt workflows and responsible delivery for Gulf region founders creating software in 2026. Get in touch today.",
  "wordpress-vs-wix-vs-shopify":
    "Compare WordPress, Wix and Shopify for UAE businesses choosing a website platform for SEO, ecommerce, design and long-term growth. Request a free quote.",
  "why-professional-graphic-design-matters-for-brand-identity":
    "See why professional graphic design helps Dubai brands build recognition, trust, consistency and stronger visual identity. Book a free consultation.",
  "how-to-download-code-from-lovable-deploy-to-vercel-or-cloudflare":
    "Learn how UK teams can export Lovable code, remove dependencies, test locally and deploy to Vercel or Cloudflare Pages. Start your project today.",
  "types-of-seo-explained-on-page-off-page-technical":
    "Understand on-page, off-page and technical SEO for Europe businesses building stronger rankings, authority, traffic and leads. See how we can help.",
};

function buildBlogPostHead(post) {
  const title = post.seo_title ?? `${post.title} | Webcore Solutions`;
  const description =
    post.seo_description ??
    post.excerpt ??
    "Webcore Solutions publishes practical insights on web development, software engineering, SEO, GEO and digital growth for Dubai and global teams.";
  const metaDescription = blogPostMetaDescriptions[post.slug] ?? description;
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = post.cover_image_url ?? `${SITE_URL}/og-image.png`;

  const meta = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(metaDescription)}">`,
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
  const { html: shellHtml, seed } = await renderRoute(routePath);
  const headHtml = insertHreflangTags(routePath, buildBlogPostHead(post));
  const html = injectRouteHtml(template, shellHtml, headHtml, seed);
  const outputPath = outputPathForRoute(routePath);

  validateHreflang(routePath, html);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
  console.log(`prerendered ${routePath} -> ${path.relative(rootDir, outputPath)}`);
}

// ── Sitemap regeneration ─────────────────────────────────────────────────────
// Read the static sitemap from public/ and append all blog post URLs.
// The result is written to dist/sitemap.xml (served at /sitemap.xml by Vercel).

const staticSitemap = await readFile(path.join(rootDir, "public", "sitemap.xml"), "utf8");

// Only append blog post URLs that are not already present in the source
// sitemap.xml — public/sitemap.xml is now the source of truth and lists
// every known post; this block is a safety net for newly-published posts
// added to Supabase since the last manual sitemap update.
const existingLocs = new Set(
  [...staticSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
);

const blogEntries = blogPosts
  .filter((post) => !existingLocs.has(`${SITE_URL}/blog/${post.slug}`))
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
