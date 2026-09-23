# Stage 4: Sitemap Framework

**Goal:** turn the intent map into a site structure and an internal-linking
plan that both users and search engines can follow.

## Sitemap skeleton

Adapt to the business — this is the default shape for a local trade or service
business:

```
/
├── /services/
│   ├── /services/[core-service-1]/
│   ├── /services/[core-service-2]/
│   └── /services/[core-service-3]/
├── /service-areas/
│   ├── /service-areas/[primary-area]/
│   └── /service-areas/[secondary-area]/
├── /projects/            (optional, if real project evidence exists)
├── /about/
├── /contact/             (quote / booking page)
└── /blog/                (optional — only with genuine expertise)
```

**Always use subfolders, not subdomains.** Subfolders consolidate domain
authority; subdomains split it.

- Good: `yoursite.com/service-areas/auckland/`
- Bad: `auckland.yoursite.com/`

## Location-page gates (hard rules)

| Threshold | Action |
|---|---|
| Up to 29 location pages | Normal, provided each is unique |
| **30+ location pages** | **WARNING** — enforce 60%+ unique content per page |
| **50+ location pages** | **HARD STOP** — require explicit owner justification |

To pass the uniqueness bar, each location page must contain:

- Unique local information (landmarks, neighbourhoods, local conditions)
- Location-specific services or offers
- Local team or staff information
- Genuine testimonials or projects from that area

A page that only swaps the place name is a doorway page. Google penalises
these, and they are the single most common way local service sites get hurt at
scale.

## Word-count minimums by page type

| Page type | Min words | Unique content |
|---|---|---|
| Homepage | 500 | 100% |
| Service page | 800 | 100% |
| Location page (primary) | 600 | 60%+ |
| Location page (secondary) | 500 | 40%+ |
| About | 400 | 100% |
| Contact / quote | 300 | 100% |
| Advice article | 1,500 | 100% |
| Project / case study | 400 | 100% |
| FAQ (if used) | 800 | 100% |

## Internal linking map

| From | To | Purpose |
|---|---|---|
| Homepage | Priority services | Push authority to money pages |
| Service page | Related services | Capture adjacent intent |
| Service page | Relevant location pages | Connect service to place |
| Location page | Service pages | Send local equity to services |
| Advice article | Relevant service page | Convert informational traffic |
| Project / case study | The service used | Prove capability, link to offer |
| About | Trust evidence | Reinforce credibility |
| Every key page | Contact / quote | Remove friction |

Targets: service page 3–5 internal links; 1,500+ word article 5–10; product or
project page 2–4.

## Hub-and-spoke architecture (required for scaled pages)

Once a section grows beyond ~10 pages (e.g. many service areas, many advice
articles, a glossary), it needs a hub:

- **Hub:** one index page listing and linking to every page in the section.
  This is the page that ranks for the generic head term ("service areas").
- **Spokes:** the individual pages, each targeting a specific long-tail query.
- **Cross-links:** related spokes link to each other where genuinely useful to
  the reader — not as a link dump.
- **Breadcrumbs** with breadcrumb structured data.

Without a hub, scaled pages become orphans and rarely get indexed. The hub also
gives you a single place to fix indexation problems across the section.

## Indexation strategy for scaled pages

- **Segment the XML sitemap by page type** (a sitemap index with one sitemap per
  section) so indexation can be diagnosed per section rather than site-wide.
- **Prioritise high-demand patterns first** — launch the strongest pages, prove
  the template, then expand.
- **Noindex genuinely thin variations** rather than letting weak pages dilute
  crawl budget.
- Respect crawl budget: a few hundred pages may be trivial on an established
  domain and impossible on a new one.
- Resolve conflicting signals (`noindex` on a page listed as canonical, for
  example) before launch.

## Rules

- Use descriptive anchor text ("marine electrical inspections"), never "click here".
- Vary anchor text — do not repeat the exact-match keyword every time.
- **No orphan pages.** Every page must be linked from at least one other page —
  via the hub or the main navigation.
- Keep location pages under a subdirectory (`/service-areas/city/`), not a
  subdomain — subdirectories consolidate authority better.
- Canonical URL must be self-referencing and consistent with internal links.
- Each page targets a distinct query — see the cannibalisation check in Stage 3.

## Output

A finalised sitemap, a page inventory with target URLs and word counts, a
completed internal-linking map, and — where a section exceeds ~10 pages — a hub
page plus a sitemap segment for that section.

---
Next: `05-page-brief-template.md`
