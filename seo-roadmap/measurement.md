# Measurement — How to Track Progress Honestly

SEO produces feedback slowly. Most metrics move in 4-12 week cycles. If you
check daily, you will think nothing is working and quit. This file tells you
what to track, how often, and what counts as a real signal vs. noise.

---

## What to check WEEKLY (10 minutes)

### 1. Seobility score
- URL: https://www.seobility.net/en/seocheck/
- Run for: https://www.webcoreuae.com/
- What's a good week: score holds or rises. Watch for sudden drops — they
  usually mean a recent code change broke something
- Expected progression:
  - Week 1: 96-97% (already shipped)
  - Weeks 2-4: 97-99% as directory backlinks start indexing
  - Weeks 5-8: 99-100%
  - Beyond: stay at 100%

### 2. Google Search Console — indexed pages
- URL: https://search.google.com/search-console
- Property: webcoreuae.com (verify if not yet)
- Coverage tab → look for indexed page count
- Expected progression:
  - Week 1: 12-13 indexed pages (homepage, services, blog if published)
  - Week 4: 16-17 indexed (4 new geo pages + 3 blog posts)
  - Week 12: 20-25 indexed (more blog posts + sub-pages)

### 3. Google Search Console — impressions
- Performance tab → 7-day rolling impressions
- Watch the trend line, not absolute numbers in week 1-2
- Expected: 50-200 impressions/week in month 1, 500-1500/week by month 3

### 4. Branded search position
- Open an incognito tab, search "Webcore Solutions UAE"
- Note our position: 1st, 2nd-3rd, 4th-10th, 11-20th, beyond
- Expected progression:
  - Week 1-2: not on page 1
  - Week 4: page 1, position 5-10
  - Week 8: page 1, position 1-3
  - Week 12: position 1 for "Webcore Solutions UAE" and "Webcore Solutions Dubai"
  - "Webcore Solutions" alone: 12+ months realistically

---

## What to check MONTHLY (30 minutes)

### 1. Referring domain count
- URL: https://ahrefs.com/backlink-checker
- Enter `webcoreuae.com`
- Note the "Referring domains" number
- Expected progression:
  - Start: ~1 referring domain
  - Month 1: 8-15
  - Month 2: 18-30
  - Month 3: 30-50
  - Month 6: 60-100
  - Month 12: 120-200

### 2. Domain Rating (DR)
- Same Ahrefs free tool
- DR is a 0-100 scale of how authoritative the domain is
- Expected progression:
  - Start: 0-5
  - Month 3: 8-12
  - Month 6: 15-22
  - Month 12: 25-35

### 3. Lighthouse scores
- Run `npx lighthouse https://www.webcoreuae.com --view`
- Or use https://pagespeed.web.dev/
- All 4 scores should stay 95+. If any drops below 90, investigate.

### 4. Top organic queries
- Search Console → Performance → Queries tab
- Sort by impressions descending
- Note new queries appearing each month — that is content compounding
- Note any queries gaining position 5+ — those are the targets for the
  next round of content reinforcement

---

## How to verify backlinks are indexed by Google

Submitting to a directory does not mean Google has crawled the listing. To
verify indexation:

### Method 1 — site:search per directory
For each Tier 1 directory after submission, search:
```
site:linkedin.com "webcoreuae.com"
site:clutch.co "webcoreuae.com"
site:goodfirms.co "webcoreuae.com"
site:crunchbase.com "Webcore Solutions"
```

If Google returns the listing page, the backlink is indexed. If not, the
listing may be live but not yet crawled (wait 1-2 weeks) or not indexed
at all (rare, but happens for low-quality directories).

### Method 2 — Ahrefs free tool
Paste webcoreuae.com into the Ahrefs Backlink Checker monthly. Backlinks
not appearing here may still count for SEO but are slower to register.

### Method 3 — Search Console "Top linking sites"
- Search Console → Links → Top linking sites
- This is Google's own list of who is linking to you
- Updates weekly-ish
- New entries here are the gold standard — Google has both crawled AND
  attributed the backlink

---

## When to expect ranking changes (honest timeframes per query)

| Query | When you might see position 1-3 | When you should worry |
|---|---|---|
| "Webcore Solutions UAE" | 6-10 weeks | If not in top 10 by week 16 |
| "Webcore Solutions Dubai" | 6-10 weeks | If not in top 10 by week 16 |
| "Webcore Solutions" (plain) | 12-24 months | Not realistic in 12 weeks; don't worry |
| "Dubai web development agency" | 6-12 months | Highly competitive |
| "UAE software development company" | 6-12 months | Highly competitive |
| "Webcore Solutions privacy policy" | 1-2 weeks | If not top 3 by week 4 (this is a fully unique query, easy win) |
| Long-tail blog queries (e.g., "how to choose dubai web development agency 2026") | 4-8 weeks per post | If not on page 1 by week 12 per post |

Different queries move at different rates. Branded queries with our exact
name + a geo qualifier move first. Generic competitive queries move last.

---

## Red flags — when to investigate

These mean something is wrong, not just slow:

| Symptom | Likely cause | First check |
|---|---|---|
| Seobility score drops 5+ points in a week | Recent code change broke a meta tag or schema | `git log --since="7 days ago"`, check meta tags |
| Indexed page count drops | Pages accidentally noindexed, or sitemap broken | Check robots.txt, sitemap.xml, meta robots tags |
| Search Console "Coverage" shows new "Excluded" errors | Crawl errors, dropped canonicals, soft 404s | Search Console Inspect URL tool |
| All directory listings rejected | NAP inconsistency (different phone formats across listings) | Audit all listings for identical NAP |
| HARO replies never get used | Pitches are too generic, too slow, or too promotional | Review actual placements vs your replies — find the gap |
| Zero ranking movement after 8 weeks of work | Either Google has not re-crawled, or work was not actually done | Check Search Console Inspect URL for staleness; verify weekly task log |
| Reviews are 4-star or lower on average | Client experience problem — fix the operational issue before chasing more reviews | Talk to the dissatisfied client |

---

## What NOT to track (it wastes time)

- **Daily ranking position** — moves randomly 5-10 positions every day. Weekly minimum, monthly preferred.
- **Bounce rate** — almost always misleading in GA4
- **Time on page** — affected by tab-switching behaviour, not really a quality signal
- **Total backlinks number** — referring DOMAINS matters; one site linking 50 times is one signal
- **Twitter / X social signals** — Google has confirmed these don't directly affect ranking
- **Anchor text "match" percentage** — over-optimisation here gets you penalised, not promoted

---

## Honest expectation per channel

| Channel | When it starts producing results |
|---|---|
| Tier 1 directories | 2-4 weeks (citations index first, ranking benefit a few weeks later) |
| UAE directories | 2-6 weeks |
| Blog content | 4-12 weeks per post |
| HARO mentions | 2-3 months until first real placement |
| Guest posts | 6-12 weeks from pitch to published article |
| Resource page outreach | 4-8 weeks per email exchange |
| Google reviews | Immediate visibility, ranking benefit within 4-8 weeks |
| Editorial PR | 3-6 months to first major placement |

If a channel is not producing after the timeframe above, either the channel
is wrong for our market, or execution is the issue. Diagnose before quitting.
