# 05 — 14-Day Execution Schedule

This is the day-by-day calendar. Following it produces a healthy submission
pace that avoids spam-pattern flags from directory aggregators and search
engines.

Pacing rule: **3-5 submissions per day, maximum.** Hitting 30 directories in
a single weekend looks like a bot to most aggregators. Spreading the work
over 14 days looks like a real human running a real business.

⚠️ Day 1 is the highest-leverage day. Do not skip Google Business Profile
and LinkedIn — they unlock most of the downstream signals.

---

## Day 1 — Foundation (60-90 min)

- [ ] Fill all placeholders in `01-company-data.md`
- [ ] Submit **Google Business Profile** — choose postcard verification
- [ ] Create **LinkedIn Company Page** — populate with long bio + logo + cover

End of day check: both submissions confirmed. Postcard for Google will
take 5-14 days to arrive — expected.

---

## Day 2 — Tier 1 directory wave A (45-60 min)

- [ ] Submit **Clutch.co** profile
- [ ] Submit **GoodFirms** profile
- [ ] Submit **DesignRush** profile

These three accept ~70% of submissions on first pass. Expect 5-14 day
approval windows.

---

## Day 3 — Tier 1 directory wave B (45 min)

- [ ] Submit **Bing Places**
- [ ] Claim **Trustpilot** business profile
- [ ] Submit **Crunchbase** organisation

---

## Day 4 — Tier 1 directory wave C (30 min)

- [ ] Submit **The Manifest**
- [ ] Submit **F6S**

End of day check: all 10 Tier 1 directories in flight. Now switch to
social profiles while approvals percolate.

---

## Day 5 — Social wave A (60 min)

- [ ] Create **Twitter / X** account `@WebcoreUAE`
- [ ] Create **Facebook Business Page** `Webcore Solutions`
- [ ] Create **Instagram Business** account `@webcore.solutions`

For each, paste the relevant bio version + website + location. Don't
worry about posting content yet — just get the profile live with the
link field filled.

---

## Day 6 — Social wave B (45 min)

- [ ] Create **YouTube** channel
- [ ] Create **Behance** profile
- [ ] Create **Dribbble** profile

For Behance + Dribbble, upload 1 visual asset each so the profiles don't
look abandoned.

---

## Day 7 — Social wave C (60 min)

- [ ] Create **GitHub Organization**
- [ ] Create **Dev.to** account
- [ ] Create **Medium publication**
- [ ] Create **Hashnode** account
- [ ] Create **Pinterest Business** account

These five together take about an hour. Each is a small backlink — but
together they form a clean "this is a real business with a real digital
presence" cluster.

---

## Day 8 — UAE wave A (30-45 min)

- [ ] Submit **Connect.ae** listing
- [ ] Submit **HiDubai** listing (the two most important UAE directories)

---

## Day 9 — UAE wave B (30 min)

- [ ] Submit **Yellow Pages UAE** listing
- [ ] Submit **Dubai Business Directory** listing

---

## Day 10 — UAE wave C (30 min)

- [ ] Submit **Yelo.ae** listing
- [ ] Submit **UAE Business Pages** listing

---

## Day 11 — UAE wave D (30 min)

- [ ] Submit **Gulf Business Directory** listing
- [ ] Send **TimeOut Dubai** editorial pitch email

---

## Day 12 — Update sameAs array + Google Search Console (45 min)

- [ ] Update `src/lib/seo.ts` `sameAs` array to include every new social
      profile URL — this is critical so Google's Knowledge Graph connects
      all profiles back to the Organization entity
- [ ] Rebuild and deploy
- [ ] Follow `07-google-search-console.md` to verify Search Console + submit
      sitemap

---

## Day 13 — Buffer / follow-ups (30 min)

- [ ] Check approval status on Day-1-4 submissions
- [ ] Fix any rejected listings (usually NAP inconsistency or missing field)
- [ ] If a directory asked for additional info, reply now

---

## Day 14 — Verification (30 min)

- [ ] Run `site:webcoreuae.com` Google search — note total indexed pages
- [ ] For each Tier 1 directory, run `site:[directory.com] "webcoreuae.com"`
      to confirm Google has indexed your listing
- [ ] Open Google Search Console → Links report — note "Top linking sites"
      count vs Day 0
- [ ] Re-run Seobility audit — note the new score
- [ ] Update the tracking tables in `02-tier1-directories.md` and
      `03-uae-directories.md`

---

## After day 14 — ongoing

Once the 14-day burst is done:

- **Weekly (15 min)**: check Seobility score + Search Console Links report
- **Weekly (30 min)**: respond to any new directory verification emails
- **Monthly (1-2 hr)**: revisit listings that didn't approve, try alternative
  submission methods, or remove them from chase list
- **Continuous**: pursue the long-form work in `seo-roadmap/` — PR pitches,
  HARO replies, content cadence

The 14-day burst should land you 20-25 indexed referring domains. From
there, every additional referring domain compounds — but each one takes
more effort. That's normal SEO economics.

---

## Daily completion log

Mark dates as you complete each day. Falling 1-2 days behind is fine.
Falling 5+ days behind kills the pacing benefit — restart from the
current day, don't try to batch-catch-up.

```
Day 1: ____ / ____ / ____   ☐ Complete
Day 2: ____ / ____ / ____   ☐ Complete
Day 3: ____ / ____ / ____   ☐ Complete
Day 4: ____ / ____ / ____   ☐ Complete
Day 5: ____ / ____ / ____   ☐ Complete
Day 6: ____ / ____ / ____   ☐ Complete
Day 7: ____ / ____ / ____   ☐ Complete
Day 8: ____ / ____ / ____   ☐ Complete
Day 9: ____ / ____ / ____   ☐ Complete
Day 10: ____ / ____ / ____  ☐ Complete
Day 11: ____ / ____ / ____  ☐ Complete
Day 12: ____ / ____ / ____  ☐ Complete
Day 13: ____ / ____ / ____  ☐ Complete
Day 14: ____ / ____ / ____  ☐ Complete
```
