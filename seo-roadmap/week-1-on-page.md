# Week 1 — On-Page Code Work (DONE)

This is the only week of the roadmap that runs entirely inside the codebase.
Everything below was applied directly by Claude. The user does not need to
execute anything from this file unless something needs adjustment.

Files modified or created are listed at the bottom.

---

## Task 1 — Close the remaining "duplicate anchor texts" issue

**Status**: ✅ Already complete (previous SEO pass)

The homepage currently has 32 internal anchors, all 32 unique. Verified
against `dist/index.html` via Node script. No further code work needed for
the Seobility "Links" check on the homepage.

Other pages (services, about, contact, faqs, privacy, sitemap, geo pages
created below) are checked at build time. If a future page introduces a
duplicate, re-run the anchor inventory script in `measurement.md`.

---

## Task 2 — Four geo-specific landing pages

To outrank companies with the same name in other regions, we created four
landing pages targeting non-competing search variants. Each page is fully
SSR-prerendered with its own H1, meta, JSON-LD, and internal-link footprint.

| URL | Target query | Target audience |
|---|---|---|
| `/webcore-solutions-dubai` | "webcore solutions dubai" | brand-aware Dubai prospects |
| `/dubai-web-development-agency` | "dubai web development agency" | local discovery searches |
| `/dubai-seo-agency` | "dubai seo agency" | SEO-shopping UAE leads |
| `/uae-software-development-company` | "uae software development company" | enterprise software buyers |

These pages are NOT thin SEO doorways. Each contains 500-700 words of real,
unique copy, a credible H2 outline, FAQ schema, and a clear CTA. They link to
the existing service pages so authority flows back to the canonical service
URLs.

Files added:
- `src/routes/webcore-solutions-dubai.tsx`
- `src/routes/dubai-web-development-agency.tsx`
- `src/routes/dubai-seo-agency.tsx`
- `src/routes/uae-software-development-company.tsx`

Page entries added to `src/lib/seo.ts` (`pageSeo`, `pageDates`, `seoRoutes`),
so each new page is automatically prerendered by `scripts/prerender.mjs` on
the next build.

---

## Task 3 — UAE disambiguation in Organization + LocalBusiness JSON-LD

The existing `Organization` schema in `src/lib/seo.ts` was strengthened to
make it unmistakable to Google that webcoreuae.com is the UAE entity,
distinct from same-name companies in Pakistan, India, the US, and the UK.

Changes:
- `legalName: "Webcore Solutions FZ-LLC"` (placeholder — confirm exact legal
  entity name and update; see "Placeholders" at the bottom of this file)
- `alternateName: ["Webcore", "WebcoreUAE", "Webcore Solutions Dubai", "Webcore Solutions UAE"]`
- `description` updated to lead with "Dubai, United Arab Emirates" so it
  appears in Knowledge Panel previews
- `address.addressRegion: "Dubai"` confirmed
- `LocalBusiness.geo.GeoCoordinates: { latitude: 25.2048, longitude: 55.2708 }`
  already present
- `slogan` added: "Dubai's premium web, software, and SEO agency"

---

## Task 4 — "Not affiliated" disambiguation paragraph

A small italicised paragraph was added to the About page footer:

> Webcore Solutions is a Dubai, UAE company. We are not affiliated with
> similarly-named businesses based in Pakistan, India, the United Kingdom, or
> the United States. All work referenced on this site was delivered by the
> Dubai team led by Muhammad Abdullah Chattha.

This is small but important. It gives Google a clear, indexable signal that
disambiguates our entity from name-collisions in other regions. Over time,
Google's Knowledge Graph picks up this kind of explicit disambiguation.

File modified: `src/routes/about.tsx`

---

## Task 5 — Brand mention density target per page

Each indexed page now mentions "Webcore Solutions" within the body text. The
brand-mention audit script in `measurement.md` enforces these floors:

| Page | "Webcore Solutions" body mentions (floor) |
|---|---|
| `/` (home) | 5+ |
| `/about` | 6+ |
| `/services` | 4+ |
| `/services/*` (each) | 3+ |
| `/contact` | 3+ |
| `/faqs` | 3+ |
| `/webcore-solutions-dubai` | 8+ |
| `/dubai-web-development-agency` | 4+ |
| `/dubai-seo-agency` | 4+ |
| `/uae-software-development-company` | 4+ |

Current homepage count: **7** (verified). Other pages: spot-check as they
are edited.

---

## Task 6 — Regenerated sitemap.xml

`public/sitemap.xml` now lists the four new geo pages with appropriate
priority and image entries. Priority assigned:

- `/webcore-solutions-dubai` → 0.9 (brand landing)
- `/dubai-web-development-agency` → 0.85
- `/dubai-seo-agency` → 0.85
- `/uae-software-development-company` → 0.85

After deploy, submit the new sitemap to Google Search Console and Bing
Webmaster Tools. Instructions in `week-2-backlinks-tier-1.md`.

---

## Placeholders the user must fill

These are values Claude cannot know. Update them before going live:

| Where | Field | Current placeholder | Action |
|---|---|---|---|
| `src/lib/seo.ts` | `legalName` | "Webcore Solutions FZ-LLC" | Replace with exact legal entity from trade licence |
| `src/lib/seo.ts` | `address.streetAddress` | not set | Add street address from trade licence (e.g. office tower, floor) |
| `src/lib/seo.ts` | `address.postalCode` | not set | Add Dubai postal code if licence specifies |
| `src/lib/seo.ts` | `vatID` | not set | Add UAE VAT registration number (15 digits) |
| `src/lib/seo.ts` | `taxID` | not set | Add Trade Licence Number if comfortable |
| `seo.ts` `sameAs` | Twitter / X | not set | Add real X profile URL if active |
| `seo.ts` `sameAs` | Instagram | not set | Add if active |
| `seo.ts` `sameAs` | YouTube | not set | Add if channel exists |

The site builds and prerenders fine without these. They simply make the
Organization Knowledge Panel richer when they are present.

---

## Verification commands

After the build, confirm Week 1 is complete:

```bash
# Build (already passes)
npm run build

# Confirm new pages prerendered
ls dist/webcore-solutions-dubai/index.html
ls dist/dubai-web-development-agency/index.html
ls dist/dubai-seo-agency/index.html
ls dist/uae-software-development-company/index.html

# Confirm sitemap includes them
grep "webcore-solutions-dubai" public/sitemap.xml
```

All four should exist. The build output already confirms prerender succeeded.
