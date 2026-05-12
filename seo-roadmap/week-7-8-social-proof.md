# Weeks 7-8 — Social Proof & Review Collection (Mixed)

By week 7, the directory listings from weeks 2-3 are mostly indexed. The next
multiplier is reviews — they affect both rankings (especially local) and
conversion. Five real Google reviews beat 50 unrelated backlinks.

**Time required**: 3-5 hours total.

The user owns this work because reviews must come from real clients. Claude
can draft the asking emails (below) and wire up review display on the
website.

---

## Where to collect reviews (priority order)

| # | Platform | Why it matters | Difficulty to get |
|---|---|---|---|
| 1 | Google Business Profile | Local pack rankings + Maps + Knowledge Panel | Easy — clients already have Google accounts |
| 2 | Clutch.co | High-intent B2B searchers see Clutch in SERPs | Medium — Clutch verifies by phone |
| 3 | Trustpilot | Shows in Google rich results; consumer trust | Easy — email-based |
| 4 | LinkedIn recommendations | Indexed on the LinkedIn company page | Medium — clients need a LinkedIn account |
| 5 | Goodfirms / DesignRush | Reinforces directory authority | Medium |

**Goal by end of week 8**: 5-8 reviews across Google + Clutch + Trustpilot.

---

## Setting up review collection (5 minutes per platform)

### Google Business Profile review link

Once verified (week 2 task):
1. Open Google Business Profile dashboard
2. Click "Get more reviews"
3. Copy the short link (looks like `g.page/r/CXY12abc/review`)
4. Use this link in every review request — it goes straight to the review
   form on a single click

### Clutch review link

Once the Clutch profile is approved:
1. Open the company dashboard
2. "Reviews" → "Get a review" → copy the invitation link
3. Clutch's verification call happens after submission, so warn the client
   that a Clutch analyst will phone them for 5 minutes to confirm the review

### Trustpilot review link

Once the Trustpilot profile is claimed:
1. Trustpilot dashboard → "Invitations" → copy the review invitation link
2. The link goes to a one-page review form

---

## Email template — request a review (Google)

Send 5-10 of these per week to clients you have a strong relationship with.
Personalise the first paragraph for each.

Subject:
```
Quick favour — 60-second Google review?
```

Body:
```
Hi [Client first name],

Wanted to drop a quick note. [Personalised line — refer to a specific
moment from the project: "the homepage launch last quarter", "the migration
that finished ahead of schedule", etc.]

If you have 60 seconds and feel comfortable, a short Google review would
genuinely help us. Other UAE businesses use these reviews to decide
whether we are the right fit, and yours would be a real signal for them.

Direct link to the review form (one click):
[Paste Google Business review short link]

A sentence or two is plenty. If a star rating with no comment is easier,
that also works.

If now isn't the right time, please ignore this — no follow-up will be sent.

Thanks again for the trust.

Best,
Muhammad
Webcore Solutions
```

---

## Email template — Clutch review request

Send to 3-5 clients who can articulate measurable outcomes. Clutch reviews
are long-form (5-10 minutes) and verified by phone, so qualify the client
first.

Subject:
```
Clutch review — would you have 15 minutes?
```

Body:
```
Hi [Client first name],

We're building out our profile on Clutch (the B2B agency review site that
ranks well for "best Dubai agencies" searches). A verified review there
would be a meaningful signal for prospects evaluating us.

The process is longer than a Google review — it's a 10-minute online form
plus a short verification call from a Clutch analyst (5 minutes, just to
confirm you're a real client). They handle scheduling.

If you'd be willing, I'll send the invitation link. The Clutch team takes
care of everything else.

If now isn't right or it's not something you do, no problem at all —
please ignore.

Thanks for considering.

Best,
Muhammad
Webcore Solutions
```

---

## Email template — Trustpilot request

Lighter than Clutch, shorter than Google review.

Subject:
```
Trustpilot review — 90 seconds?
```

Body:
```
Hi [Client first name],

We've just claimed our Trustpilot profile. If you have a moment and feel
comfortable, a short review on Trustpilot would help future clients
evaluate us.

It's a single-page form, 90 seconds maximum:
[Trustpilot review link]

A line or two is plenty. If it doesn't feel right, ignore this email.

Thanks again,
Muhammad
Webcore Solutions
```

---

## Showcasing reviews on the website

Once reviews are collected, we want them visible AND in Review schema so
Google can show star ratings in search results.

### Code-side strategy (Claude can implement on request)

1. **Replace the current static testimonials** with a dynamic component that
   pulls from a single `src/data/testimonials/home.ts` file (already exists)
   plus a new `src/data/reviews-public.ts` file containing pulled-from-real-
   sources reviews.

2. **Add `Review` schema for each public review** in `src/lib/seo.ts` so
   each review gets rich-result eligibility. Today only 4 reviews are in
   the JSON-LD `reviewsSchema`. As real Google / Clutch / Trustpilot
   reviews come in, replace the 4 placeholder reviews with real ones.

3. **Display review source badges** ("Verified Clutch review", "Google
   review", "Trustpilot review") under each quote so visitors trust them
   more than anonymous testimonials.

The user does not need to write code for this — once they have 5+ real
reviews collected, ask Claude to wire them in. The schema and component
infrastructure is already there.

---

## Tracking table

| Client | Status: contacted | Google | Clutch | Trustpilot | LinkedIn |
|---|---|---|---|---|---|
| Client A | [ ] | [ ] | [ ] | [ ] | [ ] |
| Client B | [ ] | [ ] | [ ] | [ ] | [ ] |
| Client C | [ ] | [ ] | [ ] | [ ] | [ ] |
| Client D | [ ] | [ ] | [ ] | [ ] | [ ] |
| Client E | [ ] | [ ] | [ ] | [ ] | [ ] |
| Client F | [ ] | [ ] | [ ] | [ ] | [ ] |
| Client G | [ ] | [ ] | [ ] | [ ] | [ ] |
| Client H | [ ] | [ ] | [ ] | [ ] | [ ] |

Add more rows as needed. Pick clients carefully — only ask people who
will give a strong review. A 3-star review hurts more than no review.

---

## What success looks like by end of week 8

- 5-8 Google reviews on the verified Google Business Profile (target: 4.8+ avg)
- 2-3 Clutch reviews (Clutch verification process is slow)
- 3-5 Trustpilot reviews
- 2-3 LinkedIn recommendations on the company page

That is enough volume for the next step: replacing the 4 placeholder
homepage testimonials with real reviews that link out to their original
source on Google / Clutch / Trustpilot. This is the single biggest
conversion-rate lever on the site.
