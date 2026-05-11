# Backlink Verification Guide

> Submitting a listing ≠ getting a backlink. This guide covers how to confirm each link is live, crawlable, and being counted by search engines.

---

## PART 1 — HOW TO VERIFY EACH LINK IS LIVE

### Step 1 — Check the directory listing exists
After receiving a confirmation email:
1. Open the directory in an incognito/private browser window
2. Search for "Webcore Solutions" or navigate to your listing URL
3. Confirm the listing is publicly visible (not just in your logged-in dashboard)
4. Copy the live listing URL and add it to `04-NAP-consistency.md`

### Step 2 — Confirm the website link is clickable and correct
1. On the live listing page, click the website link
2. Confirm it goes to `https://www.webcoreuae.com` (not http://, not a redirect loop)
3. Check that the link is in the HTML source (right-click → View Source → search for "webcoreuae") not just a JavaScript-rendered element (JS-only links may not be crawled)

### Step 3 — Check if the link is dofollow or nofollow
In browser DevTools (F12) or using a free extension like "NoFollow Chrome Extension":
- `rel="nofollow"` or `rel="ugc"` — link passes less authority but still counts as a citation
- No rel attribute — dofollow — passes full link equity ✓
- **Both types count toward referring domain count in Seobility**

---

## PART 2 — HOW LONG UNTIL SEOBILITY COUNTS IT

Different link types have different crawl timelines:

| Link Type | Typical Time to Appear in Seobility |
|-----------|-------------------------------------|
| Social profiles (LinkedIn, Twitter, GitHub) | 1–5 days (very high crawl priority) |
| Google Business Profile | 3–7 days (indexed quickly) |
| High-DA directories (Clutch, Crunchbase, GoodFirms) | 3–14 days |
| Mid-tier tech directories (DesignRush, F6S) | 7–21 days |
| UAE local directories (Connect.ae, YP UAE) | 7–30 days |
| Press releases (PR.com, PRLog) | 3–10 days |
| Guest post articles (once published) | 3–14 days |
| Design galleries (Awwwards, CSS Design Awards) | 14–60 days (if accepted) |
| Seobility full re-crawl frequency | Every 7–14 days |

**To force Seobility to re-crawl:** Log in → Project Settings → Re-crawl Now (if available) or wait for the scheduled crawl.

---

## PART 3 — GOOGLE SEARCH VERIFICATION

Use these search operators to see what Google has indexed:

### Check Google knows your domain has citations
```
"webcoreuae.com" -site:webcoreuae.com
```
Shows all pages Google has indexed that mention or link to your domain.

### Check if a specific directory listing is indexed
```
site:clutch.co "Webcore Solutions"
site:goodfirms.co "Webcore Solutions"
site:crunchbase.com "Webcore Solutions"
```

### Check total brand mentions (broader)
```
"Webcore Solutions" Dubai
```

### Check if your press releases are indexed
```
"Webcore Solutions" site:pr.com OR site:prlog.org OR site:onlineprnews.com
```

---

## PART 4 — FREE TOOLS TO TRACK NEW REFERRING DOMAINS

### Seobility (your primary tool)
- Log in → Project → Backlinks
- Check "Referring Domains" count weekly
- Target: increase from 1 → 20+ by Day 21

### Ahrefs Webmaster Tools (free for site owners)
1. Verify webcoreuae.com at https://ahrefs.com/webmaster-tools
2. Navigate to: Site Explorer → Referring Domains
3. Filter by "New" to see recently discovered domains
4. Sort by Domain Rating (DR) to prioritise high-value links

### Google Search Console
1. Verify webcoreuae.com at https://search.google.com/search-console
2. Navigate to: Links → External Links → Top Linking Sites
3. Note: GSC only shows links Google has already indexed — may lag 2–4 weeks behind reality

### Moz Link Explorer (free, limited)
- https://moz.com/link-explorer
- 10 free queries/month
- Shows Domain Authority of linking sites and total referring domains

### Bing Webmaster Tools (free)
- https://www.bing.com/webmasters
- Verify domain → Inbound Links
- Bing crawls some directories faster than Google

---

## PART 5 — WHAT TO DO IF A SUBMISSION IS REJECTED

| Rejection Reason | Response |
|-----------------|----------|
| "Not enough info" | Add more detail to description; re-submit with full NAP |
| "Duplicate listing exists" | Search for existing Webcore UAE/Webcore Solutions listing → claim or edit it |
| "Category doesn't exist" | Choose closest available category; add correct one in description text |
| "Website not loading" | Check webcoreuae.com uptime; resubmit once confirmed live |
| "Doesn't meet quality standards" (design galleries) | Improve mobile version; resubmit after updating |
| No response after 14 days | Follow up via contact page or email; then try alternative directory |

### Alternative Directories (if Tier 1–3 slots fill up or get rejected)

| Alternative | URL | Notes |
|-------------|-----|-------|
| Bark.com | https://www.bark.com/en/gb/ | Service marketplace with profile backlinks |
| Expertise.com | https://www.expertise.com | US-focused but accepts Dubai agencies |
| Sortlist | https://www.sortlist.com/agencies/register | EU + global agency directory |
| Agency Spotter | https://www.agencyspotter.com/agencies/new | Agency-specific directory |
| Upcity | https://upcity.com/local-marketing-agency-directory/register | US + international |
| TopDevelopers.co | https://www.topdevelopers.co/claim | Software dev focused |
| Itfirms.co | https://www.itfirms.co/list-your-company/ | IT agency directory |
| SelectedFirms | https://www.selectedfirms.co | Agency review directory |
| AppFutura | https://www.appfutura.com/list-company | App + software dev |
| TechReviewer | https://techreviewer.co/get-listed | Tech company directory |

---

## PART 6 — WEEKLY AUDIT CHECKLIST

Run this every Sunday:

```
Week ___  Date: ___________

[ ] Seobility referring domains count:  ___  (was: ___)
[ ] Ahrefs new referring domains this week: ___
[ ] GSC: new linking sites appearing: ___
[ ] New live listings confirmed: ___
[ ] Pending submissions (submitted, not yet live): ___
[ ] Rejected submissions to action: ___
[ ] Guest post pitches sent this week: ___
[ ] Guest post pitches replied/accepted: ___
[ ] Articles published with backlinks: ___

Overall progress: ___ / 20 referring domains target
```

---

## PART 7 — EXPECTED SEOBILITY SCORE PROGRESSION

| Referring Domains | Estimated Seobility External Factors Score |
|-------------------|-------------------------------------------|
| 1 (current) | ~3% |
| 5 | ~25–35% |
| 10 | ~50–60% |
| 15 | ~70–80% |
| 20 | ~85–95% |
| 25+ | ~95–100% |

> Note: Seobility's External Factors score also considers link quality (DA of referring sites), anchor text diversity, and whether links appear on topically relevant pages. A single Clutch.co link may be worth more than 5 low-DA directory links. Prioritise Tier 1 submissions accordingly.
