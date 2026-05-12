# 07 — Google Search Console (and Bing Webmaster) Setup

Single most important free SEO tool. Once verified, Search Console is the
authoritative source for:

- Which pages Google has indexed (and which it has refused)
- What queries trigger your impressions
- Your average ranking position per query
- Which external sites are linking to you
- Crawl errors and indexation issues

This file walks through claim → verification → sitemap submission →
ongoing monitoring.

---

## Part A — Claim Google Search Console

### Step 1 — Open Search Console
Visit https://search.google.com/search-console

Sign in with the Google account that will own SEO data. Recommended:
create a dedicated `seo@webcoreuae.com` Google account so that ownership
survives staff changes. Optional but cleaner long-term.

### Step 2 — Add property
Click **Add property** → choose **URL prefix** method (NOT "Domain").

Enter: `https://www.webcoreuae.com`

⚠️ Use `https://www.` — exactly. The `https://www.` prefix must match
your canonical URL. If you also want to track non-www, add a second
property: `https://webcoreuae.com` (Google treats them separately).

### Step 3 — Verify domain ownership

Google offers 5 verification methods. Pick **HTML tag** — it's the
fastest and survives deploys without re-verification:

1. Search Console shows you a meta tag like:
   ```html
   <meta name="google-site-verification" content="abc123def456..." />
   ```

2. The token has already been added to `index.html` as a placeholder:
   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_TOKEN" />
   ```

3. **Replace `REPLACE_WITH_GSC_VERIFICATION_TOKEN`** with the actual token
   Google gave you. The token is the value of the `content` attribute —
   the long string after `content="`.

4. Save `index.html`, commit, push, deploy.

5. Back in Search Console, click **Verify**. Google will fetch your
   site, find the matching token, and confirm ownership.

⚠️ Do NOT delete the meta tag after verification. Google re-checks
periodically. Removing it costs you the property.

### Step 4 — Submit your sitemap

Once verified:

1. Search Console → left sidebar → **Sitemaps**
2. Enter: `sitemap.xml`
3. Click **Submit**

Within 24-72 hours, Google will fetch the sitemap and start crawling
listed URLs in priority order. Status will progress from "Couldn't
fetch" → "Pending" → "Success".

### Step 5 — Request indexing for key pages

For your most important pages, manually request indexing:

1. URL Inspection tool (top bar) → enter URL
2. Click **Request indexing**

Request indexing for these in this order:
- `https://www.webcoreuae.com/`
- `https://www.webcoreuae.com/webcore-solutions-dubai`
- `https://www.webcoreuae.com/services`
- `https://www.webcoreuae.com/about`
- `https://www.webcoreuae.com/contact`

⚠️ Google rate-limits this to 10-12 requests per day per property. Don't
spam the button — Google deprioritises domains that spam request-indexing.

---

## Part B — Claim Bing Webmaster Tools

Optional but worth 15 minutes — Bing powers DuckDuckGo, ChatGPT Search,
Bing Copilot, and ~6-8% of UAE search.

### Step 1 — Open Bing Webmaster
Visit https://www.bing.com/webmasters

Sign in with a Microsoft account (or create one).

### Step 2 — Add site
Click **Add site** → enter `https://www.webcoreuae.com`

Bing offers an **Import from Google Search Console** option. If you
verified Google first, this is a 1-click import — saves a lot of time.

If not importing, use the **Meta tag** verification. The token is
already in `index.html` as:
```html
<meta name="msvalidate.01" content="REPLACE_WITH_BING_VERIFICATION_TOKEN" />
```

Replace the placeholder with Bing's token, redeploy, click Verify in
Bing Webmaster.

### Step 3 — Submit sitemap
Bing Webmaster → Sitemaps → enter `https://www.webcoreuae.com/sitemap.xml`

---

## Part C — What to do in the first 30 days of Search Console

### Day 1 (verification day)
- ✅ Property verified
- ✅ Sitemap submitted
- ✅ Top 5 URLs manually request-indexed

### Day 3-5
- **Coverage report**: check for any "Excluded" pages — these are URLs
  Google chose not to index. Common causes:
  - "Crawled - currently not indexed" → Google saw it but doesn't think
    it's valuable enough. Usually resolves with more backlinks and time.
  - "Discovered - currently not indexed" → Google knows it exists but
    hasn't crawled it. Wait.
  - "Page with redirect" → Expected for any redirected URLs.

### Day 7-14
- **Performance report** starts showing data. First impressions for
  branded queries appear here. Average position will be high (page 5-10)
  initially.

### Day 21-30
- **Links report** populates with first external referring sites. If your
  Tier 1 directory submissions are live by now, they should appear.

### Day 30+
- Monitor weekly. Watch for:
  - New queries appearing (means content is finding new audiences)
  - Position improving on existing queries (positive trend)
  - "Coverage" issues spiking (negative — investigate immediately)

---

## Part D — Critical Search Console settings to configure once

### 1. Email preferences
- Settings (gear icon) → User Preferences → enable email notifications
- You want to know if there's a major coverage issue, not silent

### 2. Property settings
- Settings → Crawl Stats → no action required, just bookmark for later
- Settings → Address change → leave empty unless you migrate domains
- Settings → International targeting → set country to "United Arab Emirates"
  (this is a soft signal to Google that you primarily serve UAE)

### 3. URL parameters (legacy tool — usually no action)
- Skip this unless you have a parameter-heavy site

### 4. Remove URLs (use only when needed)
- Skip unless you publish something accidentally

---

## Part E — When something goes wrong

### "Verification failed"
- Check the meta tag is INSIDE the `<head>` block, not the body
- Confirm the token matches exactly (no extra spaces, no trailing chars)
- Wait 5 minutes after deploy before retrying — CDN cache delay
- Try a different verification method (DNS TXT record, HTML file upload)

### "Sitemap fetch failed"
- Visit `https://www.webcoreuae.com/sitemap.xml` directly — does it load?
- Validate XML at https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Re-submit after fixing any errors

### "URL is not on Google" for a page you expected to be indexed
- Click "Test live URL" — Google checks your page in real-time
- If the live test passes but indexing failed, click **Request indexing**
- For pages that repeatedly fail to index: add more internal links to
  them from indexed pages

### Coverage report shows lots of "Crawled - currently not indexed"
- This is normal for new sites with low backlink counts
- Resolution: get more backlinks (do the rest of the kit), wait 4-8 weeks

---

## Part F — Beyond Search Console

After Search Console is healthy (week 4+), you should also set up:

| Tool | URL | Purpose |
|---|---|---|
| Google Analytics 4 | https://analytics.google.com | Traffic and conversion analytics |
| Bing Webmaster | (covered above) | Bing index health |
| Cloudflare or Vercel Analytics | (already in your stack) | Edge-level performance |
| Ahrefs free tier | https://ahrefs.com | Backlink intelligence |
| Microsoft Clarity | https://clarity.microsoft.com | Free heatmaps + session recordings |

Optional but useful. Search Console + Ahrefs free tier is the bare
minimum.

---

## Placeholders to fill on this page

| Where | Action |
|---|---|
| `index.html` `google-site-verification` meta tag | Replace `REPLACE_WITH_GSC_VERIFICATION_TOKEN` after claiming property |
| `index.html` `msvalidate.01` meta tag | Replace `REPLACE_WITH_BING_VERIFICATION_TOKEN` after claiming Bing |
| GSC International Targeting | Set country to "United Arab Emirates" |
| Email notifications | Enable in GSC user preferences |
