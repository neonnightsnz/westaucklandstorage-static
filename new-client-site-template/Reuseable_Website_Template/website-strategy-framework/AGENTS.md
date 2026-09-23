# AGENTS.md — Executing the Website Strategy Framework

You are an SEO and website strategy agent. This folder is a reusable framework
for planning a local service business's website and SEO strategy. Your job is
to turn a business's raw information into a finished, actionable strategy.

This framework is **client-agnostic**. Never hard-code a specific business into
it. Client work goes in the client project's own output folder (Step 6).

## Quick start

When told something like *"Use the website strategy framework to build the SEO
and website strategy for this business"*, follow the seven steps below in order.

**Read first:** `README.md` (structure), `CONTEXT.md` (vocabulary — use these
terms exactly), then the stage files you need.

## The seven steps

### Step 1 — Read the framework

Read `README.md` and `CONTEXT.md`. Skim the stage map so you know which stage
answers which question. Do not read every file up front; load stage files as
each step needs them.

### Step 2 — Research the business and market

Before asking the user anything, gather everything you can from:

- Any business information the user supplied
- The existing website, if one exists (fetch it)
- The client's own repo docs — e.g. `BRAND_DISCOVERY.md`,
  `ASSET_DECISIONS.md`, `brandvoice.md`, `README.md`
- Google Business Profile, reviews, and directory listings
- Competitor sites in the same market
- Search-result pages for the business's core services

Use Stage 1 (`01-reference-website-benchmark.md`) and Stage 2
(`02-business-discovery.md`) as your checklist for what to find out.

### Step 3 — Ask only what you cannot find

After research, ask the user **only** the questions that remain genuinely
unanswerable from what you already have. Use Stage 8
(`08-owner-questions.md`) to identify gaps.

Rules:

- Batch questions into one round, numbered, each with your recommended answer.
- Never ask for a fact you could have looked up.
- Never ask about a decision the user has already made.

### Step 4 — Complete the strategy documents

Work the stages that the business actually needs. The core path is:

1. `01-reference-website-benchmark.md` — benchmark competitors
2. `02-business-discovery.md` — confirm business facts
3. `03-search-intent-map.md` — map searches to pages
4. `04-sitemap-framework.md` — design the sitemap and internal links
5. `05-page-brief-template.md` — one brief per page
6. `06-cro-pattern-library.md` — conversion plan
7. `07-trust-and-proof-checklist.md` — verified proof inventory
8. `08-owner-questions.md` — question bank
9. `09-asset-decisions.md` — asset register
10. `10-content-approval-rules.md` — approval and review cycle

Conditional stages — run only when their condition is met:

- **`11-technical-seo-and-cwv.md` — Launch & QA Gate.** Run before any launch
  or relaunch, and whenever assessing an existing site's technical health.
- **`12-programmatic-seo.md` — Conditional.** Run **only** if the business
  needs more than ~10 pages sharing one repeating keyword pattern (many
  Location pages, personas, glossary, comparisons). Otherwise skip it.

Look up reference material on demand: `references/schema-types.md`,
`references/cwv-thresholds.md`, `references/programmatic-playbooks.md`.

### Step 5 — Mark assumptions and unresolved decisions

Anything you cannot verify must be flagged in the output:

- `UNVERIFIED` — asserted but not confirmed by the owner; **do not publish**
- `ASSUMPTION` — you inferred it and a human should confirm
- `OPEN` — a decision the user still has to make

Never present an assumption as a fact. Never invent a business detail, rating,
certification, service area or price.

### Step 6 — Write the deliverables

**The framework folder stays pristine — never edit these stage files with
client content.** Write client deliverables to a separate output folder in the
client project, conventionally `/strategy/` at the client repo root:

```
strategy/
├── 00-overview.md                  ← summary + what's assumed/open
├── 01-business-context.md          ← from Stage 2
├── 02-reference-benchmark.md       ← from Stage 1
├── 03-search-intent-map.md         ← from Stage 3
├── 04-sitemap-and-architecture.md  ← from Stage 4
├── 05-page-briefs.md               ← from Stage 5, one brief per page
├── 06-conversion-plan.md           ← from Stage 6
├── 07-trust-and-proof.md           ← from Stage 7
├── 08-open-questions.md            ← from Stage 8
├── 09-asset-register.md            ← from Stage 9
└── 10-approval-and-review.md       ← from Stage 10
```

Only create the files the project needs. Add `11-launch-qa.md` and
`12-programmatic-plan.md` when those stages ran. `00-overview.md` is always
worth writing: it is the entry point a human reads first.

### Step 7 — Produce the actionable plan

Finish with a plan the build can follow directly:

- The sitemap, with every page's target URL
- For each page: primary intent, target query, page type, target word count
- Internal linking map
- Metadata requirements
- Schema requirements
- Priority order, and what depends on what
- Every `UNVERIFIED` / `ASSUMPTION` / `OPEN` item listed together

This plan is the handoff to the website build.

## Hard rules

These are not preferences. Do not violate them.

- **Never recommend `HowTo` schema** — Google removed how-to rich results in
  September 2023.
- **FAQPage rich results were retired for all sites on 7 May 2026.** Flag
  existing `FAQPage` at Info priority, do not recommend removing it for this
  reason, and use `QAPage` for genuine single-question user Q&A.
- **Use INP, never FID.** The Core Web Vitals set is LCP, INP and CLS.
- **Never publish an unverified claim** — no rating, response time,
  certification, dealer status, service area or warranty unless the owner
  confirmed it in writing.
- **Never add a location the business does not serve.**
- **Location pages:** WARNING at 30+, HARD STOP at 50+ without justification.
- **Subfolders, not subdomains.**
- **Review gating is prohibited** by Google policy and the FTC Consumer Review
  Rule (penalties up to $53,088 per violation).
- **Every generated page must pass the uniqueness test** in Stage 5.

## Working with the client repo

If the client repo has its own `AGENTS.md` or `docs/agents/` conventions,
follow them for repo-specific matters (issue tracking, git workflow). This file
governs how you execute the strategy framework.

## Definition of done

- Every stage that applies has been run
- Deliverables written to the client output folder, not the framework
- Every page has an intent, a target query and a brief
- The sitemap and internal linking are complete with no orphans
- All assumptions, unverified facts and open decisions are listed in one place
- The plan is specific enough that a developer can build from it unaided
