# 12 — Programmatic / Location-Page Audit

**This is an audit, not a build.** Findings are from the live site, 23 Sept 2026.

## What actually exists

**Two parallel Location-page sets, 73 pages total, covering 37 suburbs.**

| Set | Pattern | Count | Words | Example |
|---|---|---|---|---|
| Set A | `/hamilton/[suburb]/` | 37 | ~470–490 | `/hamilton/fairfield` |
| Set B | `/heat-pumps-[suburb]-waikato` | 36 | ~1,969 | `/heat-pumps-fairfield-waikato` |

Both sets are indexed, both self-canonical, both targeting the same suburbs.

## Gate status

| Threshold | Position |
|---|---|
| Under 29 Location pages | Normal |
| **30+ pages** | **WARNING — currently breached at 37** |
| **50+ pages** | **HARD STOP** |

Counting both sets, there are **73 suburb-targeted pages for 37 suburbs**. The
site is past the WARNING threshold and the effective count is double the suburb
count.

## Set A fails the uniqueness test

| Test | Result | Evidence |
|---|---|---|
| Swapping the variable does not produce interchangeable content | **FAIL** | 215/300 sampled words shared with a sibling page (~72%) |
| Meets 60%+ unique content | **FAIL** | Overlap far exceeds the 40% duplication limit |
| Intro is not the heading reworded | **FAIL** | "Find [Suburb] Heat Pumps By Service" — a template with the name inserted |
| One page-specific fact, project or example | **FAIL** | None found below the fold |

**Set A is doorway-page pattern.** 37 near-duplicate pages at ~470 words.

## Set B is the better asset — audit it properly

At ~1,969 words with a distinct title pattern, Set B is doing real work. It still
needs per-page verification:

- [ ] Confirm each has genuine suburb-specific content, not padded generic copy
- [ ] Check for internal duplication across Set B
- [ ] Confirm `areaServed` and review the 4 schema blocks per page
- [ ] Check whether Set B pages are the ones actually ranking

## The core problem: cannibalisation

For each suburb, two pages compete for one query:

```
heat pumps fairfield
  ├── /hamilton/fairfield                  (indexed, self-canonical)
  └── /heat-pumps-fairfield-waikato        (indexed, self-canonical)
```

Neither can win cleanly. This is the likeliest explanation for the site being
absent from all four independent Hamilton rankings while competitors appear.

## Recommended resolution

**Consolidate to one set. Keep Set B.**

1. **Keep** `/heat-pumps-[suburb]-waikato` — longer, better titles, real content
2. **301 redirect** each `/hamilton/[suburb]/` to its Set B equivalent
3. **Remove** `/hamilton/[suburb]/` pages after the redirects are live and verified
4. **Keep** `/hamilton` as a hub listing and linking every suburb page
5. **Verify** each Set B page passes the uniqueness test; fix or consolidate the
   ones that do not

**Why keep B, not A:** B is ~4× longer, has descriptive titles, and carries more
content to salvage. A is a near-duplicate template that has to be rewritten from
scratch anyway.

**Risk:** 37 URLs are currently indexed. This is a migration — the redirects must
be in place and verified **before** the old pages are removed, and Stage 11 must
re-run immediately after.

## Do not

- Generate any new Location pages
- Expand to Waikato towns (Cambridge, Te Awamutu, Huntly) until the existing 73
  are consolidated
- Leave both sets live "to see which ranks"

## After consolidation

Then, and only then, the normal Stage 12 discipline applies:

- Hub page linking every Location page
- Sitemap segmented by page type
- 60%+ unique content per page
- 600-word minimum
- Every page passing the uniqueness test before publication
