# Worked Example — Northside Plumbing & Drainage

A complete, client-agnostic example showing how a raw business brief becomes
finished strategy deliverables. Fictional business; the reasoning is the point.

**Raw input given to the agent:**

> Northside Plumbing. We do plumbing and blocked drains around the north shore.
> Emergency callouts. Been going 12 years. Two vans. Phone is 09-555-0101.
> Want more commercial work. Not really interested in doing bathrooms anymore.

That is a typical starting point: enough to begin, not enough to plan. Note what
is missing — service area boundaries, whether "the north shore" means specific
suburbs, what "commercial" means to them, and whether the 12 years and the phone
number are even correct.

## Step 2 — What the agent researched before asking anything

- Existing website and its current pages (found: 6 pages, service pages were
  180–300 words, no Location pages)
- Google Business Profile: category set to "Plumber"; 41 reviews, 4.7; last
  review 5 weeks ago
- Competitors: 3 plumbing firms ranking for "plumber north shore" — all had
  dedicated blocked-drain pages, none had commercial pages
- Directory listings: phone number matched across 4 of 6 sources; one listing
  had a disconnected number
- Search results for "emergency plumber north shore", "blocked drain", "commercial
  plumber north shore"

## Step 3 — Questions the agent still had to ask

Only four survived research. Each with a recommendation:

1. **Which suburbs count as your service area?** Your site says "north shore"
   but your GBP service area lists 9 suburbs. Which is right? → *Use the 9 from
   GBP, and confirm you actually travel to all of them.*
2. **What does "commercial" mean here?** Body corporates, restaurants, property
   managers? → *Likely property managers and body corporates; needs confirming
   before building pages for it.*
3. **Do you still want bathroom renovation enquiries?** You said not really, but
   3 pages target them. → *Keep the pages but demote them; do not delete pages
   that still get traffic.*
4. **Two listings show a different phone number. Which is current?** →
   *Confirm 09-555-0101 is current, then fix the listings.*

## Step 4 — Deliverables produced

Written to `strategy/` in the client repo, not into the framework:

```
strategy/
├── 00-overview.md
├── 01-business-context.md
├── 02-reference-benchmark.md
├── 03-search-intent-map.md
├── 04-sitemap-and-architecture.md
├── 05-page-briefs.md
├── 06-conversion-plan.md
├── 07-trust-and-proof.md
├── 08-open-questions.md
├── 09-asset-register.md
└── 10-approval-and-review.md
```

## Step 5 — Assumptions flagged

The agent recorded these rather than presenting them as fact:

- `UNVERIFIED` — "12 years trading" (owner stated it; no source checked)
- `UNVERIFIED` — 41 reviews / 4.7 rating (from GBP; needs re-check on the day
  it is published, since these drift)
- `ASSUMPTION` — commercial work means property managers and body corporates
- `OPEN` — whether the 9 GBP suburbs are all genuinely served
- `OPEN` — whether to keep or demote the bathroom renovation pages

## Step 7 — The actionable plan (extract)

| Page | Intent | Target query | Type | Words | Priority |
|---|---|---|---|---|---|
| / | Local service | plumber north shore | Homepage | 500 | 1 |
| /services/blocked-drains/ | Local service | blocked drain north shore | Service | 800 | 1 |
| /services/emergency-plumbing/ | Urgent local | emergency plumber north shore | Service | 800 | 1 |
| /services/plumbing-repairs/ | Local service | plumber north shore repairs | Service | 800 | 2 |
| /service-areas/[suburb]/ | Local service | plumber [suburb] | Location | 600 | 2 |
| /services/commercial-plumbing/ | Commercial | commercial plumber north shore | Service | 800 | 3 |
| /about/ | Navigational | about northside plumbing | About | 400 | 3 |
| /contact/ | Transactional | contact northside plumbing | Contact | 300 | 1 |

Dependency note: the `/service-areas/[suburb]/` pages must not be built until
the `OPEN` question about the 9 suburbs is answered. Everything else can
proceed in parallel.

### Key recommendations, with their reasoning

- **Fix NAP before building anything.** Two listings show a different phone
  number. Publishing new pages on top of inconsistent NAP wastes the effort.
- **Build blocked-drains and emergency pages first.** Both have clear local
  search demand, both are urgent-intent, and no competitor has a strong blocked
  drain page.
- **Commercial is stage 3, not stage 1.** It is where the owner wants to grow,
  but it needs the "what does commercial mean" answer first, and it will not
  rank quickly.
- **Demote, do not delete, the bathroom pages.** They may still bring traffic;
  deleting throws away whatever equity they hold.
- **Eight Location pages, not twenty.** Eight real suburbs. Twenty pages is
  where thin content starts, and the business only serves nine areas anyway.

### What would tell us this failed

- No ranking movement on blocked drains within 60 days → re-check the target
  query against the actual SERP
- Location pages not indexed within 30 days → check the hub page and internal
  linking
- No change in call volume → check whether tracking was set up at all

## What this example demonstrates

1. **Research before asking** — 4 questions survived, not 30.
2. **Assumptions marked, not buried** — every unverified item is visible.
3. **One page, one intent, one target query** — the table makes the whole plan
   checkable at a glance.
4. **Dependencies made explicit** — the suburb pages are blocked on an answer.
5. **Deleting is not the default** — demote instead.

## What it deliberately does not do

- Name a real business
- Recommend one suburb structure as universally correct
- Assume the owner's self-description is accurate
