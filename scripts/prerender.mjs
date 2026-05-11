import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

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
    .replace(/<head>([\s\S]*?)<\/head>/i, `<head>$1\n    ${headHtml}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${rootHtml}</div>`);
}

function outputPathForRoute(routePath) {
  if (routePath === "/") {
    return path.join(distDir, "index.html");
  }

  const segments = routePath.replace(/^\/+|\/+$/g, "").split("/");
  return path.join(distDir, ...segments, "index.html");
}

for (const route of seoRoutes) {
  const html = injectRouteHtml(template, await renderRoute(route.path), renderHead(route.key));
  const outputPath = outputPathForRoute(route.path);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
  console.log(`prerendered ${route.path} -> ${path.relative(rootDir, outputPath)}`);
}

await rm(ssrDir, { recursive: true, force: true });
