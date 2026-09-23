# 03 — Search Intent Map

Built from research. Query groupings are inferred from competitor page titles and
known local search patterns; **actual volumes are unverified** (no keyword tool
was available) and must be confirmed against Search Console once access exists.

## Classified searches

| Query grouping | Intent | Customer problem | Page type | Target URL | Priority |
|---|---|---|---|---|---|
| heat pump installation hamilton | Local service | Wants a heat pump fitted | Service | /services/heat-pump-installation/ | 1 |
| heat pump installer hamilton | Local service | Choosing an installer | Homepage | / | 1 |
| heat pump repair hamilton | Urgent local | Unit is broken | Service | /services/heat-pump-repair/ | 1 |
| heat pump servicing hamilton | Transactional | Wants it maintained | Service | /services/heat-pump-servicing/ | 2 |
| heat pump not working / not heating | Informational → urgent | Diagnose the fault | Advice article | /blog/heat-pump-not-heating/ | 2 |
| best heat pump hamilton | Commercial investigation | Which brand/model | Comparison | /blog/best-heat-pump-nz/ | 2 |
| heat pump cost / price hamilton | Commercial investigation | What will it cost | Advice article | /blog/heat-pump-installation-cost/ | 1 |
| warmer kiwi homes heat pump | Commercial investigation | Is there a subsidy | Service | /services/warmer-kiwi-homes/ | 1 |
| heat pump grant hamilton | Commercial investigation | Wants funding | (same page) | /services/warmer-kiwi-homes/ | 1 |
| ducted heat pump hamilton | Local service | Whole-home system | Service | /services/ducted-heat-pumps/ | 3 |
| mitsubishi heat pump installer hamilton | Commercial → local | Brand preference | Service | /services/mitsubishi-heat-pumps/ | 3 |
| daikin heat pump installer hamilton | Commercial → local | Brand preference | Service | /services/daikin-heat-pumps/ | 3 |
| commercial heat pump hamilton | Commercial | Business premises | Service | /services/commercial-heat-pumps/ | 4 |
| heat pump installation [suburb] | Local service | Wants a local installer | Location | /[suburb]/ | 3 |
| contact / phone number | Navigational | Wants to call | Contact | /contact/ | 1 |
| about hamilton heat pumps | Navigational | Is this business legit | About | /about/ | 2 |

## Page vs section decisions

- **All ten advertised services → four pages.** Installation, repair, servicing
  and ducted. Filter cleaning, refrigerant leak detection and thermostat upgrades
  become **sections** within repair/servicing. Splitting them produces pages
  under 300 words with no search demand.
- **Brand pages (Mitsubishi, Daikin) → two pages, priority 3.** Only build once
  dealer status is confirmed. A brand page without credentials is worse than no
  page.
- **Warmer Kiwi Homes → one page, high priority.** Distinct intent, distinct
  audience, and a documented national programme.
- **Suburb pages → audit the existing ones, do not add new ones yet.** See
  `12-programmatic-audit.md`.

## Programme candidates (Stage 12)

| Pattern | Variable | Valid combinations | Verdict |
|---|---|---|---|
| heat pump installation [suburb] | Hamilton suburb | ~12 | **Audit existing, cap at real service area** |
| [brand] heat pump installer | brand | 2 | Not enough volume alone — fold into service pages |

Do **not** expand Location pages until the existing ones pass the uniqueness
test.

## Cannibalisation check

- "heat pump installation hamilton" and "heat pump installer hamilton" would
  collide if both got their own page. **Resolution:** the homepage owns
  "installer"; the service page owns "installation".
- "heat pump cost" and "heat pump price" are the same query. **One page.**
- Brand pages must not duplicate the installation page. **Resolution:** brand
  pages cover model selection and brand-specific reasons; installation covers
  process and price.

## Unverified

No search volume data was available. Priority order above is based on commercial
intent and competitor investment, not measured demand. **Re-rank once Search
Console access exists.**
