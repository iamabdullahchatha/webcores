import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const seoFile = path.join(rootDir, "src", "lib", "seo.ts");

const SITE_URL = "https://www.webcoreuae.com";

function expectedCanonical(routePath) {
  return routePath === "/" ? `${SITE_URL}/` : `${SITE_URL}${routePath}`;
}

function fileForRoute(routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  const segments = routePath.replace(/^\/+|\/+$/g, "").split("/");
  return path.join(distDir, ...segments, "index.html");
}

// Parse seoRoutes paths straight from src/lib/seo.ts so the verifier is
// driven by the source of truth, not a hardcoded list.
async function readSeoRoutes() {
  const src = await readFile(seoFile, "utf8");
  const block = src.match(/export const seoRoutes = \[([\s\S]*?)\]\s*as const/);
  if (!block) throw new Error("Could not locate seoRoutes array in seo.ts");
  return [...block[1].matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function rootInner(html) {
  // Content between the opening <div id="root"> and the matching close.
  const start = html.indexOf('<div id="root">');
  if (start === -1) return "";
  const after = html.slice(start + '<div id="root">'.length);
  // Cut at the bootstrap script tag that follows the root div.
  const end = after.indexOf("<script");
  return end === -1 ? after : after.slice(0, end);
}

function visibleWordCount(htmlFragment) {
  const text = htmlFragment
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 0;
  return text.split(" ").filter(Boolean).length;
}

function headSection(html) {
  const m = html.match(/<head>([\s\S]*?)<\/head>/i);
  return m ? m[1] : "";
}

const mark = (ok) => (ok ? "✓" : "✗");

const failures = [];

function check(route, file, label, ok, detail) {
  if (!ok) failures.push({ route, file, label, detail });
  return ok;
}

const routes = await readSeoRoutes();
const rows = [];

for (const route of routes) {
  const file = fileForRoute(route);
  const rel = path.relative(rootDir, file).replace(/\\/g, "/");

  if (!existsSync(file)) {
    failures.push({ route, file: rel, label: "FILE EXISTS", detail: "missing" });
    rows.push({
      route,
      cells: Array(10).fill("✗"),
      missing: true,
    });
    continue;
  }

  const html = await readFile(file, "utf8");
  const root = rootInner(html);
  const head = headSection(html);
  const canonical = expectedCanonical(route);

  // 1. exactly one <h1>
  const h1Count = (root.match(/<h1[\s>]/gi) || []).length;
  const c1 = check(route, rel, "exactly one <h1>", h1Count === 1, `found ${h1Count}`);

  // 2. at least one <h2> or <h3>
  const h2h3 = (root.match(/<h[23][\s>]/gi) || []).length;
  const c2 = check(route, rel, ">=1 <h2>/<h3>", h2h3 >= 1, `found ${h2h3}`);

  // 3. >=250 visible words inside #root
  const words = visibleWordCount(root);
  const c3 = check(route, rel, ">=250 words", words >= 250, `${words} words`);

  // 4. >=10 internal <a href="/..."> links
  const internal = (root.match(/<a[^>]+href="\/(?!\/)[^"]*"/gi) || []).length;
  const c4 = check(route, rel, ">=10 internal links", internal >= 10, `${internal} links`);

  // 5. >=1 external https link
  const external = (root.match(/<a[^>]+href="https:\/\/[^"]*"/gi) || []).length;
  const c5 = check(route, rel, ">=1 external link", external >= 1, `${external} links`);

  // 6. non-empty <title>
  const titleMatch = head.match(/<title>([\s\S]*?)<\/title>/i);
  const titleOk = !!titleMatch && titleMatch[1].trim().length > 0;
  const c6 = check(route, rel, "<title>", titleOk, titleMatch ? `"${titleMatch[1].trim()}"` : "absent");

  // 7. non-empty <meta name="description">
  const descMatch = head.match(/<meta[^>]+name="description"[^>]*>/i);
  const descContent = descMatch ? (descMatch[0].match(/content="([^"]*)"/i) || [])[1] : undefined;
  const descOk = !!descContent && descContent.trim().length > 0;
  const c7 = check(route, rel, "<meta description>", descOk, descOk ? "present" : "absent/empty");

  // 8. <link rel="canonical"> matches page URL
  const canMatch = head.match(/<link[^>]+rel="canonical"[^>]*>/i);
  const canHref = canMatch ? (canMatch[0].match(/href="([^"]*)"/i) || [])[1] : undefined;
  const c8 = check(route, rel, "canonical matches", canHref === canonical, `got ${canHref ?? "none"}, want ${canonical}`);

  // 9. all three alternate hreflang point to this page's canonical URL
  const altMatches = [...head.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]*>/gi)];
  const altHrefs = altMatches.map((m) => (m[0].match(/href="([^"]*)"/i) || [])[1]);
  const altOk =
    altHrefs.length === 3 &&
    altHrefs.every((h) => h === canonical);
  const c9 = check(
    route,
    rel,
    "3 alternates -> page URL",
    altOk,
    altHrefs.length ? altHrefs.join(" | ") : "none",
  );

  // 10. has JSON-LD schema
  const ld = /<script[^>]+type="application\/ld\+json"[^>]*>/i.test(head);
  const c10 = check(route, rel, "JSON-LD schema", ld, ld ? "present" : "absent");

  rows.push({
    route,
    cells: [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10].map(mark),
  });
}

const headers = [
  "Route",
  "1·H1",
  "2·H2/3",
  "3·≥250w",
  "4·≥10int",
  "5·≥1ext",
  "6·title",
  "7·desc",
  "8·canon",
  "9·alt",
  "10·LD",
];

console.log("| " + headers.join(" | ") + " |");
console.log("| " + headers.map(() => "---").join(" | ") + " |");
for (const r of rows) {
  console.log("| " + [r.route, ...r.cells].join(" | ") + " |");
}

console.log("");
if (failures.length === 0) {
  console.log("ALL CHECKS PASSED — every route is SEO-complete.");
} else {
  console.log(`${failures.length} FAILED CHECK(S):`);
  for (const f of failures) {
    console.log(`  ✗ ${f.file} — ${f.label} (${f.detail})`);
  }
  process.exitCode = 1;
}
