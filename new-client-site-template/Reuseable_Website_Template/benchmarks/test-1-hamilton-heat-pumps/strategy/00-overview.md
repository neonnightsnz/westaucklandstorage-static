# Strategy Overview — Hamilton Heat Pumps

**Status:** First-pass strategy, built from research and a live-site audit.
Owner has not yet confirmed the business facts.
**Prepared:** 23 September 2026
**Framework:** `website-strategy-framework/`

---

## The situation in six lines

1. The business is real: `hamiltonheatpumps.co.nz`, 0800 301 005, Te Rapa.
2. The site is **live and indexed** — 78 URLs in the sitemap.
3. It runs **two parallel Location-page sets for the same 37 suburbs** — 73 pages
   in total, both indexed, both self-canonical.
4. The `/hamilton/[suburb]/` set is **near-duplicate content**: ~470 words per
   page, ~72% shared with siblings.
5. The site is **absent from all four** independent Hamilton rankings, while
   competitors with real review records appear in them.
6. The homepage reads as templated copy, including the ungrammatical
   "an customer focused solution".

## The core problem

This is **not** a "needs more pages" problem. It is two problems:

**Cannibalisation.** For every suburb, two pages compete for one query. Google
cannot rank either cleanly. This is the most likely cause of the site's weak
local visibility.

**Credibility.** Competitors publish review counts (up to 468), named dealer
credentials, multi-year warranties and price bands. This site publishes none of
those, and does not claim the two brands the owner says it uses.

## Revised priority order

The live audit changed this. The duplicate-page problem now comes first, because
it actively suppresses everything else.

| # | Action | Why |
|---|---|---|
| 1 | **Consolidate the two Location-page sets** | 73 competing pages are suppressing visibility for the whole domain |
| 2 | Verify business facts with the owner | Most claims are unverified |
| 3 | Fix the trust layer (reviews, warranty, pricing, process) | Nothing converts without it |
| 4 | Rewrite the homepage and service pages | Currently templated and generic |
| 5 | Build the Warmer Kiwi Homes angle | Real demand, no competitor owns it |
| 6 | Remaining technical fixes (schema contents, CWV, NAP) | Necessary, not urgent |

**Do not generate new Location pages** until step 1 is complete.

## What this run actually established

**Verified by research and live checks:** business name, phone, address, service
list, homepage status, robots.txt, sitemap, page counts, duplicate sets,
within-set duplication, canonical tags, schema presence, competitor set,
market pricing, absence from local rankings.

**UNVERIFIED — owner must confirm:** years trading, review count and rating,
dealer certifications, warranty terms, insurance, licences, genuine service
area, whether all ten advertised services are real, Warmer Kiwi Homes provider
status.

**ASSUMPTION:** the owner wants lead volume over brand positioning (implied by
"we want more installation enquiries"), and commercial work is minor.

**OPEN:** 11 questions in `08-open-questions.md`, 6 of which block work.

## Files in this folder

| File | Contents |
|---|---|
| `00-overview.md` | This file |
| `01-business-context.md` | What we know about the business |
| `02-reference-benchmark.md` | Competitor analysis |
| `03-search-intent-map.md` | Queries to pages |
| `04-sitemap-and-architecture.md` | Proposed structure |
| `05-page-briefs.md` | Per-page briefs |
| `06-conversion-plan.md` | CTAs and proof per page type |
| `07-trust-and-proof.md` | Evidence inventory and gaps |
| `08-open-questions.md` | Questions for the owner |
| `09-asset-register.md` | Assets needed |
| `10-approval-and-review.md` | Approval and review cycle |
| `11-launch-qa.md` | Technical gate — **run, partial** |
| `12-programmatic-audit.md` | Location-page audit — **critical findings** |

## What is still missing

- Search volume data (no keyword tool available) — the intent map's priorities
  are based on commercial intent and competitor investment, not measured demand
- Core Web Vitals field data (needs a browser, not just HTTP)
- Full metadata check across all 78 URLs
- GBP details: review count, primary category, current state
