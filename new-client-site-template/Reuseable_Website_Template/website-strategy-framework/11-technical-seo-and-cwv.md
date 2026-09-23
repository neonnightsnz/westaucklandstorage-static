# Stage 11: Technical SEO and Core Web Vitals

> **Execution role: Launch & QA Gate.** Run this before any launch or relaunch,
> and whenever assessing an existing site's technical health. It is not part of
> the sequential discovery path.

**Goal:** make sure the pages you built can actually be found, indexed and
ranked. Content quality is wasted on a site Google cannot crawl or a page users
abandon before it loads.

## Indexability

- [ ] Every important page returns HTTP 200
- [ ] One self-referencing canonical per page, matching the internal links
- [ ] `robots.txt` does not block important paths or resources
- [ ] No accidental `noindex` on pages that should rank
- [ ] XML sitemap present, valid, and listed in `robots.txt`
- [ ] Sitemap contains only canonical, indexable URLs
- [ ] HTTPS site-wide; one canonical host (with or without `www`, not both)
- [ ] Redirect chains cleaned up; 301 for permanent moves
- [ ] No orphan pages — every page reachable by internal links
- [ ] Return 404/410 for removed pages, 301 for moved ones

> **Mobile-first indexing is the default.** Googlebot Smartphone is the primary
> crawler. The mobile version must carry the same primary content, structured
> data and meta tags as desktop. A missing mobile version is not an automatic
> blocker, but content or parity loss between versions is a real risk.

## On-page technical requirements

| Element | Requirement |
|---|---|
| Title tag | 30–60 chars, unique, primary keyword near the start |
| Meta description | 120–160 chars, unique, CTA written for that page |
| H1 | Exactly one per page, includes service + location where natural |
| Heading order | Logical H1 → H2 → H3, no levels skipped for styling |
| URL | Descriptive, lowercase, hyphens, stable |
| Alt text | 10–125 chars, descriptive, on all non-decorative images |
| OG / social | Title, description, image set per page |

## Core Web Vitals

The metric set is **LCP, INP and CLS**. Use **INP, never FID** — FID was
retired as a metric. Field data (real users, via CrUX / Search Console) is what
counts for ranking; lab data (Lighthouse) is for debugging.

| Metric | Good | Needs improvement | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5s | 2.5–4.0s | > 4.0s |
| INP (Interaction to Next Paint) | ≤ 200ms | 200–500ms | > 500ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |

### LCP
- [ ] Compress and correctly size the hero image; serve WebP/AVIF
- [ ] `preload` the LCP image; do not lazy-load it
- [ ] Inline critical CSS; defer non-critical CSS and JS
- [ ] Target TTFB under 800ms (caching, CDN)
- [ ] Use `font-display: swap` and preload the primary font

### INP
- [ ] Break long JavaScript tasks into pieces under 50ms
- [ ] Debounce heavy event handlers
- [ ] Keep DOM size reasonable (roughly under 1,500 elements)
- [ ] Defer or remove third-party scripts that hijack the main thread
- [ ] Avoid synchronous storage access in interaction handlers

### CLS
- [ ] Set explicit width/height (or aspect-ratio) on images and iframes
- [ ] Reserve space for ads, embeds and dynamically injected content
- [ ] Avoid inserting content above existing content
- [ ] Preload fonts to prevent swap-induced shift

## Structured data

Add schema only where it is accurate. See `references/schema-types.md` when
the skill runtime is available.

- [ ] Homepage: `Organization` (or the correct `LocalBusiness` subtype)
  with `name`, `url`, `telephone`, `address`, `geo`,
  `openingHoursSpecification`, `sameAs`
- [ ] Service pages: `Service` linked to the business via `provider`,
  with `areaServed`
- [ ] Local pages: `LocalBusiness` with `areaServed` and `sameAs`
- [ ] Author / team pages: `ProfilePage` + `Person`
- [ ] Use the most specific correct subtype — an incorrect primary category
  is one of the most damaging local mistakes
- [ ] Validate: `@context` is `https://schema.org`, no placeholder text,
  absolute URLs, ISO 8601 dates

**Never recommend `HowTo`** — rich results were removed in September 2023.

**FAQPage:** Google retired FAQ rich results for **all** sites on **7 May 2026**.
Existing `FAQPage` markup should be flagged at Info priority, not Critical, and
should not be removed solely for this reason. Do not recommend *new* FAQPage for
Google SERP benefit. For genuine single-question user Q&A, use `QAPage`.

## Local search signals

Google Business Profile signals are the single largest local ranking factor
group, so treat this section as high priority rather than cleanup.

### Google Business Profile
- [ ] Profile verified, with the **correct primary category** — an incorrect one
      is among the worst local mistakes
- [ ] Business title contains the real service keywords, with no stuffing
- [ ] Reviews show steady recent velocity (stale profiles lose rankings)
- [ ] Photos, services menu, attributes and opening hours complete
- [ ] Q&A monitored and answered where the category supports it

### Consistency
- [ ] NAP identical across the site, GBP and all citations
- [ ] Apple Business, Bing Places, Facebook and Yelp listings claimed
- [ ] Tier-1 citations consistent; aggregators (Data Axle, Foursquare) correct

## AI search readiness (GEO)

- [ ] Important pages are indexed and eligible to be shown with a snippet —
  this is the floor; nothing else matters until it is met
- [ ] `llms.txt` considered where it adds clarity for AI crawlers
- [ ] Key facts stated plainly and self-containedly so they can be quoted
- [ ] Brand mentions across the web — mentions matter more than backlinks for
  AI citation
- [ ] Do not block legitimate AI crawlers you intend to be cited by

## Measurement

- [ ] Google Search Console verified; sitemap submitted
- [ ] Search Analytics reviewed for queries, impressions, CTR and position
- [ ] Watch for high-impression, low-click pages — these are usually title or
  intent mismatches, the cheapest wins available
- [ ] Core Web Vitals report monitored (the standalone Page Experience report
  was removed from Search Console)
- [ ] Phone-call and form tracking configured
- [ ] Branded vs. non-branded queries separated when reviewing performance

> **Highest-leverage constraint first.** A single technical defect — a
> non-indexable page, a slow LCP, a missing canonical — can gate every other
> improvement. Fix the blocker before optimising content or links.

---

## Launch checklist

- [ ] All Stage 4 pages exist, meet word counts, and are linked
- [ ] Metadata unique and within length, checked across the whole site
- [ ] Schema valid on the pages that need it
- [ ] CWV pass on mobile field data
- [ ] Sitemap and robots correct; indexing verified
- [ ] Forms tested end to end; notifications arriving
- [ ] Tracking live and reporting
- [ ] GBP complete and linked
- [ ] Accuracy review scheduled
