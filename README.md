# Webcore Solutions — webcoreuae.com

Production website for [www.webcoreuae.com](https://www.webcoreuae.com) — a Dubai digital agency for web, software, CMS, SEO, GEO and branding.

Built with **React 19 + Vite 7 + TanStack Router** and **prerendered to static HTML** at build time for full SEO support. See [src/lib/seo.ts](src/lib/seo.ts) for the per-page SEO source-of-truth and [scripts/prerender.mjs](scripts/prerender.mjs) for the build-time prerender.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Client build → SSR build → prerender all 17 SEO routes into `dist/<route>/index.html` |
| `npm run preview` | Preview the built `dist/` output |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

---

## Search Console Verification

Search engine verification meta tags are **not committed** to this repository. Each engine issues a unique token; paste it into [index.html](index.html) inside `<head>` after claiming your property, then rebuild and deploy.

### Where exactly to paste

Open [index.html](index.html). Inside the `<head>` block, paste the verification meta tags **directly above** the line `<meta name="mobile-web-app-capable" content="yes" />`. That section currently looks like:

```html
    <meta name="theme-color" content="#0f172a" />
    <meta name="color-scheme" content="light dark" />

    <meta name="mobile-web-app-capable" content="yes" />
```

Insert verification tags between the blank line and `mobile-web-app-capable`, so the result is:

```html
    <meta name="theme-color" content="#0f172a" />
    <meta name="color-scheme" content="light dark" />

    <meta name="google-site-verification" content="PASTE_GSC_TOKEN_HERE" />
    <meta name="msvalidate.01" content="PASTE_BING_TOKEN_HERE" />

    <meta name="mobile-web-app-capable" content="yes" />
```

### Google Search Console (GSC)

1. Go to https://search.google.com/search-console
2. **Add property** → choose **URL prefix** → enter `https://www.webcoreuae.com`
3. Pick the **HTML tag** verification method. Google gives you a tag like:
   ```html
   <meta name="google-site-verification" content="abc123..." />
   ```
4. Copy the value of the `content` attribute and paste it into the `google-site-verification` meta tag in [index.html](index.html) (see "Where exactly to paste" above).
5. Run `npm run build` so the token is baked into every prerendered page in `dist/`.
6. Deploy.
7. Back in Search Console, click **Verify**.

Then submit the sitemap: Search Console → Sitemaps → enter `sitemap.xml` → Submit.

### Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. **Add site** → enter `https://www.webcoreuae.com`. (If GSC is already verified, click **Import from Google Search Console** for a 1-click import and skip the steps below.)
3. Pick **Meta tag** verification. Bing gives you a tag like:
   ```html
   <meta name="msvalidate.01" content="XYZ789..." />
   ```
4. Copy the value of the `content` attribute and paste it into the `msvalidate.01` meta tag in [index.html](index.html).
5. Run `npm run build` and deploy.
6. Click **Verify** in Bing Webmaster.

Then submit the sitemap: Bing Webmaster → Sitemaps → enter `https://www.webcoreuae.com/sitemap.xml`.

### Important notes

- **Do not delete the meta tags after verification.** Both Google and Bing re-check periodically; removing the tag forfeits the property.
- **The tokens are NOT secrets** — they only prove ownership. Committing them to git is safe and standard practice.
- **Both tokens are page-wide.** Adding them once to [index.html](index.html) means every prerendered route in `dist/` inherits them on the next build.
- If verification fails: confirm the meta tag is inside `<head>` (not `<body>`), confirm the token has no extra whitespace, and wait 5 minutes after deploy for CDN propagation.

---

## SEO architecture (quick reference)

| Concern | Source of truth |
|---|---|
| Page titles, descriptions, keywords | [src/lib/seo.ts](src/lib/seo.ts) `pageSeo` |
| JSON-LD `@graph` schema | [src/lib/seo.ts](src/lib/seo.ts) builder functions |
| robots.txt | [public/robots.txt](public/robots.txt) |
| sitemap.xml | [public/sitemap.xml](public/sitemap.xml) |
| llms.txt | [public/llms.txt](public/llms.txt) |
| PWA manifest | [public/site.webmanifest](public/site.webmanifest) |
| OG image | [public/og-image.png](public/og-image.png) (+ webp variant) |
| Prerender pipeline | [scripts/prerender.mjs](scripts/prerender.mjs) |
