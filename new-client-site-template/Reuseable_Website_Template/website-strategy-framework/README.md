# Local Business Website Framework

A reusable, client-agnostic framework for planning and improving a local service
business's website and SEO strategy — from the first discovery call through to
launch and ongoing maintenance.

**This folder is meant to be copied whole into a client project.** Give an agent
the business information and say *"use the website strategy framework to build
the SEO and website strategy for this business"*; it follows
[`AGENTS.md`](./AGENTS.md).

> Customer → problem → search intent → useful page → local proof → clear action

If a page cannot be traced back through that chain, it should not exist.

## What's in here

| File | Role |
|---|---|
| `AGENTS.md` | **Execution procedure** — the seven steps an agent follows |
| `CONTEXT.md` | Vocabulary. Use these terms exactly |
| `README.md` | This file — the human-readable overview |
| `01`–`10` | Core stages, run in order |
| `11` | **Launch & QA Gate** — run before launch/relaunch (conditional) |
| `12` | **Conditional** — only for scaled page patterns |
| `references/` | Look-up material, loaded on demand |
| `examples/` | One neutral worked example — see `examples/local-service-business/` |

## How to use it

**New client project:** copy the whole `website-strategy-framework/` folder
into the client repo, then point an agent at it with the business information
you have. The agent researches first and asks only what it genuinely cannot
find.

**Existing site:** run Stages 01–05 as an audit, then jump to the weakest area.
Confirm business facts (Stage 02) before rewriting pages — otherwise you write
confident, well-optimised copy about services the client does not offer.

**Single page:** use `05-page-brief-template.md` with the stages it references.

**Outputs never go in this folder.** The framework stays pristine so it can be
updated and re-copied; client deliverables go to `/strategy/` in the client
repo. See `AGENTS.md` Step 6.

## Stage map

| Stage | File | Produces | When |
|---|---|---|---|
| 1 | `01-reference-website-benchmark.md` | Benchmark of 3–5 reference sites | Always |
| 2 | `02-business-discovery.md` | Confirmed business facts | Always |
| 3 | `03-search-intent-map.md` | Query → intent → page map | Always |
| 4 | `04-sitemap-framework.md` | Sitemap + internal linking plan | Always |
| 5 | `05-page-brief-template.md` | One brief per page | Always |
| 6 | `06-cro-pattern-library.md` | Conversion plan per page type | Always |
| 7 | `07-trust-and-proof-checklist.md` | Verified proof inventory | Always |
| 8 | `08-owner-questions.md` | Answered question bank | Always |
| 9 | `09-asset-decisions.md` | Asset register | Always |
| 10 | `10-content-approval-rules.md` | Approval + review cycle | Always |
| 11 | `11-technical-seo-and-cwv.md` | Technical launch checklist | **Before launch** |
| 12 | `12-programmatic-seo.md` | Pages-at-scale strategy | **Only if scaling** |

## Minimum Viable Website

The smallest site that can still rank and convert for a local service business:

1. Homepage — 500+ words, clear service + location, one primary CTA
2. One page per core service — 800+ words each
3. One Location page — 600+ words, 60%+ unique content
4. About page — 400+ words, real people, real credentials
5. Contact / quote page — phone, form, hours, service area
6. `LocalBusiness` schema on the homepage, `Service` schema on service pages
7. XML sitemap, `robots.txt`, canonical tags, HTTPS
8. Working Google Business Profile with the correct primary category

Do not launch without items 1–8. Everything else can follow.

## Optional expansion

Add only when the business can genuinely support it:

- Additional Location pages (respect the gates in Stage 4)
- Advice articles (1,500+ words, real expertise, not filler)
- Project or case-study pages with photos and specifics
- FAQ content (as `QAPage` where it is genuine user Q&A — see Stage 11)
- Team / author pages with `ProfilePage` and `Person` schema
- Multi-location pages with a shared `Organization` + `branchOf` structure
- Programmatic sections — see Stage 12 first (locations, personas, comparisons,
  glossary, examples)

## Rules for adapting ideas

- Never copy a competitor's copy, structure or claims — copy the reasoning.
- Never add a location, service, certification or guarantee the business cannot
  deliver.
- Never publish a rating, response time or credential the owner has not
  confirmed in writing.
- Prefer updating a page that already has visibility over creating a new one.
- When Google's documentation and community advice conflict, follow Google.

## Standards this framework enforces

Current as of September 2026. Re-verify against primary sources before quoting
externally.

- **Schema:** `HowTo` is never recommended (rich results removed Sept 2023).
  FAQ rich results were retired for **all** sites on **7 May 2026** — flag
  existing `FAQPage` at Info priority, do not recommend removal, and use
  `QAPage` for genuine user Q&A.
- **Core Web Vitals:** LCP, INP and CLS. **INP, never FID.**
- **Reviews:** review gating is prohibited by Google policy and the FTC Consumer
  Review Rule (effective 21 Oct 2024; penalties up to $53,088 per violation).
- **Metadata:** unique per page is necessary but not sufficient — a stock CTA
  templated across every page is a content-quality problem even when each
  string is technically unique.
- **Location pages:** WARNING at 30+, HARD STOP at 50+ without justification.
- **Programmatic pages:** every generated page must pass the Stage 5 uniqueness
  test. Subfolders, never subdomains.

## Final quality checklist

- [ ] Every page traces back to a real customer need and a real service
- [ ] One clear primary purpose per page
- [ ] Word count meets the minimum for its page type (Stage 4)
- [ ] Title 30–60 chars, meta description 120–160 chars, both unique
- [ ] Every trust claim verified by the owner in writing
- [ ] NAP identical across the site, GBP and citations
- [ ] One primary CTA per page, matched to visitor intent
- [ ] Internal links follow the Stage 4 map; no orphan pages
- [ ] Valid schema on the pages that need it
- [ ] Core Web Vitals pass on mobile field data
- [ ] Indexable: canonicals, robots, sitemap, HTTPS all correct
- [ ] Quarterly accuracy review scheduled
- [ ] Scaled sections have a hub page and a segmented sitemap
- [ ] No two pages target the same query and intent
- [ ] Every generated page passes the uniqueness test
