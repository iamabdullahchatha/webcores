# Week 4 — Content Marketing (Mixed Code + Manual)

Goal: publish content that ranks for low-competition, high-intent, UAE-specific
search queries. These are queries the global "Webcore" competitors are not
targeting at all.

3 blog posts have already been drafted by Claude as markdown files in
`src/content/blog/` (see file list at the bottom). The user reviews,
optionally edits, then approves them for publishing.

---

## The strategy in one paragraph

Long-tail, geo-specific queries are where this site can rank in the next
60-90 days. Generic terms like "web development agency" are owned by sites
with 500+ referring domains. Queries like "how to choose a Dubai web
development agency in 2026" have 10-50 monthly searches and almost no
serious competition. Ranking #1-3 for ten of those is more valuable than
ranking #50 for one generic term.

---

## 10 blog topics (priority order)

### 1. How to choose a Dubai web development agency in 2026

- **Target keyword**: `dubai web development agency` (also: `how to choose web development agency dubai`)
- **Search intent**: commercial investigation
- **Meta description**: "A practical 9-point checklist for evaluating Dubai web development agencies in 2026 — pricing, process, team size, portfolio, and the questions to ask before signing."
- **Outline**:
  1. The Dubai agency landscape in 2026 (saturation, price ranges, common red flags)
  2. The 9-point evaluation checklist (with example questions)
  3. What "Dubai web development agency" really means: in-house team vs reseller
  4. Average project costs in AED / USD by scope
  5. Red flags + how to spot a marketing-heavy / delivery-light agency
- **Drafted as**: `src/content/blog/how-to-choose-dubai-web-development-agency.md` ✅

### 2. SEO services in UAE: a 2026 buyer's guide

- **Target keyword**: `seo services uae` (also: `uae seo agency`)
- **Search intent**: commercial investigation
- **Meta description**: "What SEO services should cost in the UAE in 2026, what to expect month by month, and how local SEO differs from international SEO for UAE-based businesses."
- **Outline**:
  1. UAE SEO market overview — pricing baselines (AED / USD)
  2. The 4-month timeline most SEO engagements follow
  3. Local SEO vs international SEO: when each matters for UAE businesses
  4. What to ask before signing a 6-month retainer
  5. Red flags: guaranteed rankings, "we own Google", PBN networks
- **Drafted as**: `src/content/blog/seo-services-uae-2026-buyers-guide.md` ✅

### 3. GEO vs SEO: what UAE businesses need to know

- **Target keyword**: `geo seo difference uae` (also: `generative engine optimization`)
- **Search intent**: informational, becoming commercial
- **Meta description**: "Generative Engine Optimization (GEO) and traditional SEO are converging. Here's what UAE businesses need to know about ranking in ChatGPT, Perplexity, and Google AI Overviews in 2026."
- **Outline**:
  1. Definitions: SEO vs GEO vs AEO in plain language
  2. Why GEO matters now: AI search penetration in UAE
  3. What changes for content production
  4. Technical signals: schema, entities, citations, llms.txt
  5. UAE-specific examples: how Arabic-English queries surface in AI search
- **Drafted as**: `src/content/blog/geo-vs-seo-uae-businesses.md` ✅

### 4. The real cost of custom software development in the UAE (2026)

- **Target keyword**: `custom software development cost uae`
- **Outline**: AED / USD ranges by project type (MVP, internal tool, SaaS,
  enterprise), what's bundled vs extra, why offshore quotes are misleading
- **Status**: Outline only — drafted in a later week

### 5. Headless CMS vs WordPress for UAE businesses: a decision framework

- **Target keyword**: `headless cms vs wordpress dubai`
- **Outline**: Decision tree, performance comparison, editorial workflow
  trade-offs, hosting costs in UAE, when each wins
- **Status**: Outline only

### 6. WCAG 2.2 accessibility for UAE websites: what the law requires

- **Target keyword**: `accessibility website uae law`
- **Outline**: UAE Federal Law No. 29 on People of Determination, what
  websites must comply, audit checklist, retrofit costs
- **Status**: Outline only

### 7. From idea to MVP in 8 weeks: a Dubai founder's playbook

- **Target keyword**: `mvp development dubai`
- **Outline**: Week-by-week breakdown, scope hammering, the 5 features rule,
  cost ranges, hand-off checklist
- **Status**: Outline only

### 8. E-commerce platforms compared for UAE retailers: Shopify vs WooCommerce vs custom

- **Target keyword**: `ecommerce platform uae comparison`
- **Outline**: VAT handling, AED payment gateways, COD workflows, transaction
  fees, scale ceilings
- **Status**: Outline only

### 9. The 12-week SEO roadmap that actually works for Dubai businesses

- **Target keyword**: `seo roadmap dubai`
- **Outline**: This file's structure, adapted to "any Dubai business" instead
  of "Webcore". Establishes our authority while being genuinely useful.
- **Status**: Outline only

### 10. How AI is changing branding agencies in Dubai

- **Target keyword**: `ai branding agency dubai`
- **Outline**: Use of generative AI in logo iteration, copywriting workflows,
  what stays human, what doesn't, pricing implications
- **Status**: Outline only

---

## How to publish the 3 drafted posts

The drafts are written. The user needs to:

1. Read each draft in `src/content/blog/`
2. Edit anything that does not match Webcore's actual experience
3. Decide whether to add an image hero (drafts reference `image: ...` frontmatter
   pointing to optional WebP assets — feel free to remove the line if no image)
4. Once approved, the user (or Claude in a follow-up) wires up the blog index
   route at `/blog` and individual post routes at `/blog/[slug]`
5. Add each post URL to `public/sitemap.xml`
6. Add each post entry to `src/lib/seo.ts` `pageSeo` so they have proper meta tags

A follow-up Claude task can do step 4-6 mechanically once the user has
approved the drafts. The drafts are not auto-wired to avoid accidentally
publishing unreviewed content.

---

## Cadence after week 4

- Weeks 5-8: publish posts 4-6 (one per week)
- Weeks 9-12: publish posts 7-10 (one per week)
- Beyond: 1 post every 1-2 weeks indefinitely

Skipping cadence kills compounding traffic. Pick a publishing day (e.g.,
Tuesday morning Dubai time) and do not miss it.
