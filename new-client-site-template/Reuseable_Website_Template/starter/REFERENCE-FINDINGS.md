# Reference First — Starter Capability Findings

**Method:** derive required capabilities from Test 1's strategy outputs, then
inspect existing proven work before proposing anything new. Do not design a
starter in the abstract.

**Inputs:**
- Requirements: `benchmarks/test-1-hamilton-heat-pumps/strategy/`
- References: 3 existing Astro projects on disk

---

## 1. What Test 1 says the starter must handle

Extracted from the strategy deliverables, not imagined:

| Requirement | Source |
|---|---|
| Services as first-class entities (8 service pages) | `05-page-briefs.md` |
| Service x Location relationships | `04-sitemap-and-architecture.md` |
| Location pages **with a safeguard against doorway pages** | `12-programmatic-audit.md` |
| A location hub listing every Location page | `04`, `12` |
| Multiple CTAs per page, matched to intent (call vs quote vs eligibility) | `06-conversion-plan.md` |
| Trust/proof assets: reviews, warranty, credentials, price band | `07-trust-and-proof.md` |
| E-E-A-T entities: business, team, credentials | `07` |
| SEO metadata per page, with a templated-metadata guard | `05`, `11` |
| Structured data: LocalBusiness, Service, areaServed, FAQ/QAPage | `11` |
| Redirects (73 -> consolidated Location pages) | `12` |
| Build-time validation of the above | `05`, `11` |

The critical one is the **location safeguard**. The starter must not be a
doorway-page factory.

## 2. Reference inventory

| Reference | Astro | Relevant capability |
|---|---|---|
| `westaucklandstorage-static` | ^7.3.2 | **Location content model + build-time enforcement.** Closest match. |
| `steady-wins-seo` | ^7.3.1 | Blog/content collections, SEO utilities, sitemap, RSS, permalinks |
| `gazeley-gem-static` | ^7.3.2 | Booking, property pages, local-guide hub, minimal footprint |

## 3. Key finding: the safeguard already exists

`westaucklandstorage-static` **already implements the location model this problem
needs.** It should be adopted, not reinvented.

### `src/data/locations.ts` — the safeguard, in the type system

    export interface Suburb {
      name: string;
      slug: string | null;   // null = we serve the area but have no dedicated guide
      note: string;
    }

The comment is explicit:

> A `slug` of null means we serve the area but have no dedicated guide yet. It
> is listed, but not linked, and it gets no /storage-near-*/ page either.

This is exactly the decision tree:

    Service area
        |
        v
    Enough unique local evidence for a page?
        |-- YES -> slug: '<guide-slug>'  -> Location page
        '-- NO  -> slug: null            -> listed on the hub, not linked, no page

**The safeguard is enforced by the type system, not by discipline.**

### `src/data/locationPages.ts` — the uniqueness contract

> Each entry adds what the suburb itself needs to know: a heading carrying the
> search term, at least two sections of local detail, and a bullet list of items
> people actually store from that area. It does not repeat a suburb guide, and it
> does not restate what we store.

The `LocationPage` interface demands `sections` of suburb-specific detail. A page
cannot be created without them — there is nowhere to put generic filler.

### `scripts/check-site.mjs` — enforcement at build time

> Adding a guide without a page, or a page without a guide, fails the build in
> check-site.mjs.

Concrete assertions it already makes:

- Location hub links **all 19** suburb guides
- Suburbs without a guide are **listed, not linked**
- Hub groups suburbs into 4 areas
- No duplicate sitemap entries; every sitemap URL resolves
- Shared nav present exactly once; skip link present
- One enquiry form per page, with a clear action
- No broken internal links or images
- Metadata asserted per page

**This is a working precedent for everything Test 1 requires.**

## 4. KEEP / ADAPT / REFERENCE / REJECT

| Capability | Verdict | Source |
|---|---|---|
| Location model with `slug: string \| null` safeguard | **KEEP** | westaucklandstorage |
| Location page content contract (`sections`, `bullets`) | **KEEP** | westaucklandstorage |
| Build-time location enforcement | **KEEP** | westaucklandstorage |
| Location hub with grouped areas | **KEEP** | westaucklandstorage |
| Sitemap generation + validation | **KEEP** | westaucklandstorage, steady-wins-seo |
| `npm run check:site` gate | **KEEP** | westaucklandstorage |
| Blog/content collections | **ADAPT** | steady-wins-seo (heavy: RSS, embeds, icons) |
| SEO utilities, permalinks | **ADAPT** | steady-wins-seo |
| Booking flow | **REJECT** | gazeley-gem-static (not needed) |
| Stripe | **REJECT** | gazeley-gem-static |
| `curated-blog.mjs` (44 KB), `blogPosts.json` (63 KB) | **REJECT** | client content, not starter material |
| Static export copies, `wp-content` etc. | **REJECT** | not starter material |

## 5. Verified environment

| Item | Value |
|---|---|
| Node | v26.7.0 |
| npm | 11.12.1 |
| Astro in references | ^7.3.1 / ^7.3.2 |

## 6. Recommended minimum starter

Derived from requirements, assembled from what exists:

    src/
    |-- data/
    |   |-- company.ts          <- business entity (NAP, hours, service area)
    |   |-- services.ts         <- service entities
    |   |-- locations.ts        <- Location model WITH slug: string | null
    |   |-- locationPages.ts    <- Location page content contract
    |   |-- reviews.ts          <- trust/proof
    |   '-- seo.ts              <- metadata helpers
    |-- components/
    |   |-- Header.astro  Footer.astro  Breadcrumbs.astro
    |   |-- Hero.astro  CTA.astro
    |   |-- ServiceCard.astro  LocationCard.astro
    |   '-- QuoteForm.astro  ReviewSlider.astro
    |-- layouts/PageLayout.astro
    |-- pages/
    |   |-- index.astro  [slug].astro  contact.astro
    |   |-- services/[...slug].astro
    |   |-- service-areas/index.astro   <- hub
    |   '-- sitemap.xml.ts  robots.txt.ts  404.astro
    '-- styles/global.css
    scripts/
    |-- check-site.mjs          <- the build gate
    '-- lib/site-checks.mjs

**Do not design this from scratch.** Port the location model and checks from
`westaucklandstorage-static`, generalise the naming, drop the client data.

## 7. What this exercise already proves

The instinct "build me an Astro starter" would have produced a generic
page-scaffold — and a generic location-page generator, which is precisely the
doorway-page factory Test 1 warned against.

Reference First found a working safeguard already in production. The starter's
most important feature is not a component; it is the `slug: string | null` type.

## 8. Next step

Assemble the minimum starter from the KEEP items, generalised and stripped of
client data. Then run Test 2's full handoff:
raw brief -> strategy -> starter -> website -> QA.
