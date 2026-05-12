# 06 — Verification & Tracking

How to verify your backlinks are actually live, indexed, and counting
toward Seobility's External Factors score.

---

## The verification rhythm

| Frequency | Action | Time |
|---|---|---|
| Day 7 after each submission | Confirm listing is live on the directory | 2 min/listing |
| Weekly | Re-run Seobility audit | 5 min |
| Weekly | Check Google Search Console "Links" report | 5 min |
| Monthly | Free Ahrefs backlink check | 5 min |

---

## How to verify a single backlink is live

### Step 1 — Find the listing on the directory
Open the directory site, search "Webcore Solutions". Confirm your
profile shows up with the website link intact.

If the listing exists but the website link is missing, edit the listing
and add the URL. Some directories silently strip URLs during the
approval process — frustrating but fixable.

### Step 2 — Confirm Google has crawled the listing
Open Google in an incognito window and search:

```
site:[directory-domain.com] "webcoreuae.com"
```

For example:
```
site:linkedin.com "webcoreuae.com"
site:clutch.co "webcoreuae.com"
site:hidubai.com "webcoreuae.com"
```

If Google returns a result, the backlink is indexed and counts toward
your referring domain total. If no results, wait another 7-10 days
before checking again.

### Step 3 — Verify in Google Search Console
- Open Search Console → property `webcoreuae.com`
- Left sidebar → **Links** → **Top linking sites**
- This is Google's own authoritative list of who is linking to you
- Compare to your tracking checklist — entries here are *confirmed*
  backlinks

Note: GSC's link report updates every 1-2 weeks, sometimes slower. Don't
expect a directory submitted yesterday to show up in GSC tomorrow.

---

## Expected progression — the realistic week-by-week curve

| Week | Submissions made | Listings live | Indexed by Google | Seobility External Factors |
|---|---|---|---|---|
| 0 (today) | 0 | 0 | 1 (existing) | 3% |
| 1 | 10-15 (Tier 1 + first social) | 3-5 (instant ones: LinkedIn, Trustpilot, F6S) | 2-3 | ~15-25% |
| 2 | 25-30 (all directories + most social) | 12-18 | 8-12 | ~50-65% |
| 3 | 30 (all submissions in) | 20-25 | 14-20 | ~75-85% |
| 4 | 30 | 25-30 | 18-25 | ~85-95% |
| 5-6 | (waiting on slow ones) | 28-30 | 22-28 | ~90-100% |
| 7-8 | (slow approvals + GSC catches up) | 30 | 25-30 | **100%** |

**Realistic floor**: 18 indexed referring domains by week 6 if you do
EVERYTHING in the kit.

**Realistic ceiling**: 28 indexed referring domains by week 8 if you also
execute the day-14 GSC sitemap submission and some directories pull from
each other.

---

## Seobility score progression

Right after deploying this round's code changes (today):

| Metric | Before | After today's deploy | After kit (8 weeks) |
|---|---|---|---|
| Meta data | 100% | 100% | 100% |
| Page Structure | 100% | 100% | 100% |
| Page Quality | 95% | 96-97% | 98-100% |
| Links | 98% | 100% | 100% |
| Server | 100% | 100% | 100% |
| External Factors | 3% | 3% | 90-100% |
| **Overall** | **92%** | **94%** | **100%** |

The jump from 94% → 100% only happens when external sites actually link
to you. That is the entire purpose of this kit.

---

## What to check WEEKLY

Set a recurring calendar reminder — every Monday morning, 15 minutes:

### 1. Re-run Seobility
- Visit https://www.seobility.net/en/seocheck/
- Enter `https://www.webcoreuae.com/`
- Note the overall score and which subscores changed since last week
- Add a row to a simple spreadsheet: Date | Overall | Meta | Page Q | Links | External

### 2. Google Search Console — Links
- Open Search Console
- Links → Top linking sites
- Note the count and any new domains since last week

### 3. Google Search Console — Performance
- Performance tab → last 7 days
- Note: impressions, clicks, average position
- Expected: gradual climb week over week, not linear

### 4. Site indexation
- Run `site:webcoreuae.com` in incognito Google search
- Note the "About X results" number at the top
- Should be 17+ (one per prerendered route) — flag if it drops

---

## What to check MONTHLY (30 min)

### 1. Ahrefs Backlink Checker (free)
- Visit https://ahrefs.com/backlink-checker
- Enter `webcoreuae.com`
- Note: Referring Domains count, Domain Rating
- This refreshes weekly-ish, so monthly check is sufficient

### 2. Bing Webmaster Tools (after you claim it on day 12)
- Visit https://www.bing.com/webmasters
- Reports tab — note Bing's own backlink count (often different from
  Google's)

### 3. Brand mention search
- Search `"Webcore Solutions" -site:webcoreuae.com` in Google
- This shows where your brand is mentioned WITHOUT a link — these are
  "unlinked mentions" worth following up to request a link

---

## Red flags — when something is wrong

| Symptom | Likely cause | First action |
|---|---|---|
| Seobility score drops after deploy | Recent code change broke a meta tag | Check `git log`, validate JSON-LD at schema.org validator |
| Indexed pages drops in `site:` search | Pages accidentally noindexed, sitemap broken | Check `robots.txt`, `sitemap.xml`, meta robots tags |
| Listings approved but not appearing in `site:` search after 4 weeks | Google considers the directory low-quality and refused to index | Move on, focus on higher-tier directories |
| Multiple directories reject the submission | NAP inconsistency between submissions | Audit all listings against `01-company-data.md`, fix to match |
| Trustpilot reviews are 4-star or below | Operational issue with clients, not SEO | Talk to dissatisfied clients before chasing more reviews |
| Search Console shows "0 results in last 30 days" | Property may not be verified yet | Re-verify in Search Console |

---

## When you can stop using this kit

Stop after **either** of these is true:

1. Seobility shows 100% overall AND External Factors above 90%
2. Search Console shows 25+ "Top linking sites" entries

Whichever happens first, the kit has done its job. The remaining work
shifts to `seo-roadmap/week-4-content-marketing.md` (publishing) and
`seo-roadmap/week-9-12-link-building.md` (HARO, guest posts, resource
pages).

---

## What this kit does NOT cover

Honest scope clarification:

- ❌ Editorial backlinks from publications (covered in
  `seo-roadmap/week-5-6-pr-outreach.md`)
- ❌ HARO replies (covered in `seo-roadmap/week-9-12-link-building.md`)
- ❌ Guest posts (covered in `seo-roadmap/week-5-6-pr-outreach.md`)
- ❌ Resource page outreach (covered in `seo-roadmap/week-9-12-link-building.md`)

The kit gets you to a clean baseline (20-25 referring domains). Real
ranking traction beyond that requires the harder, slower work in the
`seo-roadmap/` folder.
