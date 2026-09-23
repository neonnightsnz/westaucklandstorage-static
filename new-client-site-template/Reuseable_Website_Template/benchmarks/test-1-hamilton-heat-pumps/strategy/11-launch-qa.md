# 11 — Launch and QA Gate

**Status: PARTIAL — run 23 Sept 2026.** Live-site checks completed. Layout/CWV
and field-data checks still need a browser.

**Context: this is a relaunch, not a greenfield build.** The site is live, has 78
URLs in its sitemap, and is indexed. Any URL change needs a redirect plan, and
this gate must run before those changes, not after.

## Site facts (verified)

| Item | Value |
|---|---|
| Homepage | HTTP 200, 83 KB |
| robots.txt | HTTP 200 — `User-agent: *` only, 13 bytes |
| Sitemap | HTTP 200, 78 URLs |
| Location pages | **37** under `/hamilton/[suburb]/` |
| Second page set | **36** under `/heat-pumps-[suburb]-waikato` |
| Schema | 4 `ld+json` blocks per page — **present** |

## Critical finding: 73 pages for 37 suburbs

The site runs **two parallel Location-page sets for the same suburbs**:

```
/hamilton/fairfield                     ← 483 words, title "Find Fairfield Heat Pumps By Service"
/heat-pumps-fairfield-waikato           ← 1,969 words, title "Heat Pumps Fairfield | Air Conditioning | Split Systems"
```

Both are indexed, both self-canonical, and both target the same suburb.

**This is textbook cannibalisation.** Two pages competing for one query split
authority, and Google has to choose which to rank. It usually chooses neither
well.

It is also **at the Stage 12 WARNING threshold (37 > 30)** and approaching the
HARD STOP at 50.

## Critical finding: the /hamilton/ set is near-duplicate content

Compared `/hamilton/fairfield` (483 words) with `/hamilton/hillcrest` (471
words):

- **215 of 300 sampled words are common to both** (~72% overlap)
- Both open with the same template, varied only in wording
- ~470 words is below the 600-word minimum for a primary Location page

The `/heat-pumps-[suburb]-waikato` set is longer (1,969 words) and looks like the
better asset — but still needs the uniqueness test applied per page.

## Other findings

| Item | Finding | Severity |
|---|---|---|
| Canonicals | Self-referencing and correct on both sets | Pass |
| Sitemap | Present, valid, 78 URLs | Pass |
| robots.txt | Does not block anything important | Pass |
| Schema | 4 ld+json blocks per page | Pass (validate contents) |
| Templated copy | "customer focused" ×3, incl. "an customer focused solution" | Critical (content) |
| Duplicate page sets | 2 sets, same suburbs | Critical |
| Thin Location pages | 483 words vs 600 minimum; 72% overlap | High |
| No hub page | No page lists and links all suburbs | High |
| Brands unclaimed | Mitsubishi/Daikin named by owner, absent from site | High |
| Absent from rankings | Not in top5.nz, 10best.co.nz, topchoice.co.nz, MoneyHub | High |

## Still to check (needs a browser)

**Core Web Vitals (mobile field data)**
- [ ] LCP ≤ 2.5s
- [ ] INP ≤ 200ms — **not FID**
- [ ] CLS ≤ 0.1
- [ ] Hero image preloaded, not lazy-loaded
- [ ] 83 KB homepage HTML — check render-blocking resources

**Metadata at scale**
- [ ] Title lengths (30–60 chars) across all 78 URLs
- [ ] Meta descriptions, 120–160 chars, unique per page
- [ ] Templated-metadata check — run across the whole set

**Schema contents**
- [ ] LocalBusiness with the correct primary category
- [ ] `areaServed` accuracy on Location pages
- [ ] No `HowTo`

**Local**
- [ ] GBP verified, correct primary category
- [ ] NAP identical on site, GBP, citations
- [ ] Review velocity (see 07)
- [ ] Apple Business, Bing Places, Facebook, Yelp claimed

## Gate verdict

**DO NOT LAUNCH OR EXPAND until the duplicate page sets are resolved.** Building
more content on top of 73 competing pages would compound the problem.

## Note

This gate ran after the strategy was drafted, and it changes the priority order.
The duplicate-set problem now outranks the trust-layer work, because it is
actively suppressing visibility for everything else.
