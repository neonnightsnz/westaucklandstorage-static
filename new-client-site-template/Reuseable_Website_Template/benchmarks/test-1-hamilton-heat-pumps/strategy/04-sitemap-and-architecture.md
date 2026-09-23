# 04 — Sitemap and Architecture

## Proposed structure

```
/
├── services/
│   ├── heat-pump-installation/     ← priority 1
│   ├── heat-pump-repair/           ← priority 1
│   ├── heat-pump-servicing/        ← priority 2
│   ├── ducted-heat-pumps/          ← priority 3
│   ├── warmer-kiwi-homes/          ← priority 1 (differentiator)
│   ├── mitsubishi-heat-pumps/      ← priority 3 (blocked: needs dealer confirmation)
│   ├── daikin-heat-pumps/          ← priority 3 (blocked)
│   └── commercial-heat-pumps/      ← priority 4
├── [suburb]/                       ← EXISTING. Audit before adding more.
├── blog/
│   ├── heat-pump-installation-cost/
│   ├── best-heat-pump-nz/
│   └── heat-pump-not-heating/
├── about/
└── contact/
```

**Note on `/[suburb]/`:** the existing site puts Location pages at the root
(`/hamilton/fairfield`). The framework default is `/service-areas/[area]/`.
**Do not change this yet** — moving existing indexed URLs is a migration risk
for no guaranteed gain. Keep the current pattern; fix the content first. Revisit
only if the pages are being regenerated anyway.

## Word-count targets

| Page | Min words | Note |
|---|---|---|
| Homepage | 500 | Currently templated; full rewrite |
| Each service page | 800 | Currently ~300 or absent |
| Location page (primary) | 600 | Must include real local content |
| Location page (secondary) | 500 | 40%+ unique |
| Blog article | 1,500 | Only with genuine expertise |
| About | 400 | Currently thin |
| Contact | 300 | Phone, form, hours, service area |

## Internal linking map

| From | To | Purpose |
|---|---|---|
| Homepage | Installation, Repair, Warmer Kiwi Homes | Push to money pages |
| Every service page | /contact/ | Convert |
| Installation | Ducted, brand pages, cost article | Capture adjacent intent |
| Repair | Servicing, cost article | Retain the customer |
| Servicing | Repair, Installation | Upsell / cross-sell |
| Warmer Kiwi Homes | Installation, /contact/ | Convert subsidy seekers |
| Location pages | Parent service pages | Send local equity to services |
| Location pages | /contact/ | Local conversion |
| Blog articles | Relevant service page | Convert informational traffic |
| About | Reviews, credentials | Reinforce trust |

Targets: service page 3–5 links; blog article 5–10; Location page 3–5.

## Rules

- Descriptive anchor text — "heat pump installation in Hamilton", never "click here".
- Vary anchor text; don't repeat the exact-match keyword every time.
- **No orphan pages.**
- One self-referencing canonical per page.
- Each page targets a distinct query — see the cannibalisation check in `03`.

## Hub requirement

Once Location pages are in scope, the `/[suburb]/` section **needs a hub page**
listing and linking to every suburb. Currently there is no evidence of one. Without
a hub, the suburb pages are orphaned from the main architecture and index poorly.

## Dependencies

- Brand pages (Mitsubishi, Daikin) are **blocked** on confirming dealer status.
- Any new Location pages are **blocked** on confirming the genuine service area.
- Everything else can proceed in parallel.

## Output

Sitemap above, with per-page priorities. Build order: priority 1 pages, then the
trust layer, then everything else.
