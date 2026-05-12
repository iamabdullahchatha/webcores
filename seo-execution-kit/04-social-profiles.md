# 04 — Social Profiles (Each Profile = 1 Backlink)

Each social profile is one referring domain when the platform's profile
page is crawled and indexed. The website field is sometimes buried in
settings — this file tells you exactly where to put webcoreuae.com on
each platform.

12 platforms. About 15-20 minutes per platform if you already have logo
and bio assets prepared. Bio versions live in `01-company-data.md`.

---

## Master table

| # | Platform | Profile setup URL | Where to put webcoreuae.com | Bio version | Status |
|---|----------|-------------------|----------------------------|-------------|--------|
| 1 | LinkedIn Company | Done in `02-tier1-directories.md` (#3) | About → Website | Long bio | ☐ |
| 2 | Twitter / X | https://twitter.com/signup | Edit profile → Website | Short bio (160 char limit) | ☐ |
| 3 | Facebook Business | https://business.facebook.com | Page Info → Website | Mid bio | ☐ |
| 4 | Instagram Business | https://business.instagram.com | Edit profile → Website | Short bio | ☐ |
| 5 | YouTube Channel | https://youtube.com/create_channel | Customise → Basic info → Links | Mid bio | ☐ |
| 6 | Behance | https://www.behance.net | Profile → Edit → Website | Mid bio | ☐ |
| 7 | Dribbble | https://dribbble.com/signup | Profile → Settings → Website | Short bio | ☐ |
| 8 | GitHub Org | https://github.com/organizations/new | Org settings → Website | Short bio | ☐ |
| 9 | Dev.to | https://dev.to/enter | Profile → Customisation → Website | Mid bio | ☐ |
| 10 | Medium publication | https://medium.com/new-publication | Settings → Customise → URL | Mid bio | ☐ |
| 11 | Hashnode | https://hashnode.com/onboard | Profile → Settings → Personal info | Mid bio | ☐ |
| 12 | Pinterest Business | https://business.pinterest.com | Settings → Profile → Website | Short bio | ☐ |

---

## Per-platform specifics

### 2. Twitter / X — `@WebcoreUAE` recommended

- Handle: `@WebcoreUAE` (if taken: try `@WebcoreSolutionsUAE` or `@WebcoreDubai`)
- Display name: `Webcore Solutions`
- Bio: paste **Short bio** (Twitter limit is 160 chars — bio fits)
- Location field: `Dubai, United Arab Emirates`
- Website field: `https://www.webcoreuae.com`
- Header image: 1500×500 (create from existing brand assets)
- Profile photo: 400×400 (use 512×512 logo, Twitter will resize)
- Verification: Twitter Blue is optional. Skip unless team posts daily.

After creation: pin one tweet linking to a service page. Twitter's external-
link reach is throttled, but the profile crawl still counts as a backlink.

---

### 3. Facebook Business Page

- Page name: `Webcore Solutions`
- Username: `webcoresolutionsuae` (the URL slug — must be unique)
- Category: `Web Designer` + `Software Company` (Facebook allows 3)
- About → Description: paste **Mid bio**
- Page Info → Website: `https://www.webcoreuae.com`
- Page Info → Phone: `+971 50 716 9200`
- Page Info → Email: `info@webcoreuae.com`
- Profile picture: 512×512 logo
- Cover photo: 820×312

The existing Facebook URL in code (`https://www.facebook.com/profile.php?id=...`)
appears to be a personal profile, not a Business Page. Create a proper
Business Page and update `src/lib/seo.ts` `sameAs` array to the new URL.

---

### 4. Instagram Business — `@webcore.solutions` recommended

- Handle: `@webcore.solutions` (if taken: `@webcoreuae` or `@webcore.dubai`)
- Display name: `Webcore Solutions`
- Bio: paste **Short bio**
- Category: Business → Marketing Agency
- Website field: `https://www.webcoreuae.com` (this is the ONLY clickable
  link Instagram allows in the entire profile — guard it carefully)
- Contact options: enable email + phone

---

### 5. YouTube Channel

Even if you don't plan to publish videos, the channel page itself is a
backlink. 20 minutes to set up, lasts forever.

- Channel name: `Webcore Solutions`
- Handle: `@webcoresolutionsuae`
- About → Description: paste **Mid bio**
- About → Links → add: webcoreuae.com (display name "Website"), LinkedIn,
  GitHub, Behance
- Country: United Arab Emirates
- Banner: 2560×1440 (use existing brand cover image)
- Profile picture: 800×800

After creation: upload 1 placeholder video (founder intro, 30 seconds is
fine) so the channel doesn't look abandoned.

---

### 6. Behance — design portfolio

- Username: `webcoresolutions`
- Display: `Webcore Solutions`
- Profile → Edit profile → "On the Web" → add webcoreuae.com
- Project uploads: add 3-5 brand/design pieces
- Location: Dubai, UAE
- Industry: `Graphic Design`

Behance profiles rank well in image search for "Dubai brand design".

---

### 7. Dribbble — design portfolio

- Username: `webcoresolutions`
- Profile → Settings → Profile → Website: `https://www.webcoreuae.com`
- Upload 3 shots minimum (logo concepts, UI designs, brand systems)

---

### 8. GitHub Organization

Free organisation account. Useful for the few clients who actually look
at GitHub when evaluating dev shops.

- Org name: `webcoresolutions` or `webcore-uae`
- Settings → Profile → Website URL: `https://www.webcoreuae.com`
- Settings → Profile → Description: paste **Short bio**
- Add 1-2 public repos (could be a project starter template, a tutorial,
  or an open-source utility your team built)
- Location: `Dubai, UAE`

---

### 9. Dev.to — developer community

- Username: `webcoresolutions`
- Profile → Customisation → Website URL: webcoreuae.com
- Bio: paste **Mid bio**
- Location: Dubai, UAE

If your team writes any technical posts on the company blog, cross-post
1-2 to Dev.to. The cross-posts include canonical URLs pointing back to
webcoreuae.com — proper canonical SEO.

---

### 10. Medium Publication

- Publication name: `Webcore Solutions Blog`
- URL slug: `medium.com/webcore-solutions`
- About → Description: paste **Mid bio**
- Customise → URL: link out to `webcoreuae.com`
- Logo: 800×800

Like Dev.to, use Medium to cross-post blog content with canonical URL
pointing back to webcoreuae.com.

---

### 11. Hashnode

- Username: `webcoresolutions`
- Profile → Settings → Personal info → Website: webcoreuae.com
- Bio: **Mid bio**

Same canonical cross-post strategy as Medium / Dev.to.

---

### 12. Pinterest Business

Lower priority but free. Pinterest pins indexed by Google for visual
queries.

- Profile → Settings → Profile → Website: `https://www.webcoreuae.com`
- Verify website ownership via meta tag (Pinterest gives you a meta tag
  to add to `index.html` — same pattern as Google Search Console)

If you implement Pinterest verification, add the meta tag to `index.html`
following the existing GSC pattern.

---

## After all 12 are submitted

You will now have ~12 new social/profile backlinks. Not all will be
indexed by Google immediately — expect 60-80% to be indexed within 4 weeks.

The other 20-40% may never be indexed (some platforms `noindex` profile
pages with low activity). This is normal and not worth chasing.

---

## Tracking summary

| # | Platform | Profile created | Website field added | Logo uploaded | Activity (1+ post) |
|---|---|---|---|---|---|
| 1 | LinkedIn Company | ☐ | ☐ | ☐ | ☐ |
| 2 | Twitter / X | ☐ | ☐ | ☐ | ☐ |
| 3 | Facebook Business | ☐ | ☐ | ☐ | ☐ |
| 4 | Instagram Business | ☐ | ☐ | ☐ | ☐ |
| 5 | YouTube | ☐ | ☐ | ☐ | ☐ |
| 6 | Behance | ☐ | ☐ | ☐ | ☐ |
| 7 | Dribbble | ☐ | ☐ | ☐ | ☐ |
| 8 | GitHub Org | ☐ | ☐ | ☐ | ☐ |
| 9 | Dev.to | ☐ | ☐ | ☐ | ☐ |
| 10 | Medium | ☐ | ☐ | ☐ | ☐ |
| 11 | Hashnode | ☐ | ☐ | ☐ | ☐ |
| 12 | Pinterest | ☐ | ☐ | ☐ | ☐ |

After creation, update the `sameAs` array in `src/lib/seo.ts` to include
every new profile URL. This is how Google's Knowledge Graph connects
them all to your Organization entity.
