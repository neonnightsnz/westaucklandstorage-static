# The 12 Programmatic SEO Playbooks

Reference for Stage 12. Each playbook: the search pattern, what it is, why it
works, the value it must deliver, and the URL convention.

## 1. Templates
**Pattern:** "[type] template" / "free [type] template"
**Searches:** "resume template", "invoice template"

Downloadable or interactive templates users can use directly.

- **Why it works:** high intent (people need it now), linkable assets, natural
  for product-led businesses.
- **Value required:** actually usable (not previews), multiple variations,
  quality comparable to paid options, easy download flow.
- **URL:** `/templates/[type]/` or `/templates/[category]/[type]/`

## 2. Curation
**Pattern:** "best [category]" / "top [number] [things]"
**Searches:** "best website builders", "top 10 crm software"

Curated lists ranking or recommending options in a category.

- **Why it works:** comparison shoppers, high commercial intent, evergreen.
- **Value required:** genuine evaluation criteria, real testing or expertise,
  visible update date, not just affiliate-driven rankings.
- **URL:** `/best/[category]/` or `/[category]/best/`

## 3. Conversions
**Pattern:** "[X] to [Y]" / "[amount] [unit] in [unit]"
**Searches:** "$10 USD to GBP", "100 kg to lbs"

Tools or pages converting between formats, units or currencies.

- **Why it works:** instant utility, very high volume, repeat usage.
- **Value required:** accurate real-time data, fast functional tool, related
  conversions suggested, mobile-friendly.
- **URL:** `/convert/[from]-to-[to]/`

## 4. Comparisons
**Pattern:** "[X] vs [Y]" / "[X] alternative"
**Searches:** "webflow vs wordpress", "figma alternatives"

Head-to-head comparisons between products or options.

- **Why it works:** high purchase intent, clear pattern, scales with the number
  of competitors.
- **Value required:** honest balanced analysis, actual feature data, a clear
  recommendation by use case, updated when products change.
- **URL:** `/compare/[x]-vs-[y]/` or `/[x]-vs-[y]/`

## 5. Examples
**Pattern:** "[type] examples" / "[category] inspiration"
**Searches:** "saas landing page examples", "portfolio website examples"

Galleries or collections of real-world examples.

- **Why it works:** research-phase traffic, highly shareable, natural for
  design and creative work.
- **Value required:** real high-quality examples, screenshots or embeds,
  categorisation and filtering, analysis of why each works.
- **URL:** `/examples/[type]/` or `/[type]-examples/`

## 6. Locations
**Pattern:** "[service/thing] in [location]"
**Searches:** "coworking spaces in san diego", "dentists in austin"

Location-specific pages for services or information.

- **Why it works:** local intent is massive, scales with geography.
- **Value required:** actual local data (not a swapped city name), local
  providers or options, location-specific insight such as pricing or
  regulations, map integration helpful.
- **URL:** `/[service]/[city]/` or `/locations/[city]/[service]/`
- **Gates:** Stage 4 location-page thresholds apply (WARNING at 30+, HARD
  STOP at 50+).

## 7. Personas
**Pattern:** "[product] for [audience]" / "[solution] for [role/industry]"
**Searches:** "payroll software for agencies", "crm for real estate"

Landing pages addressing specific audience segments.

- **Why it works:** speaks to the searcher's context, converts better than a
  generic page, scales with persona count.
- **Value required:** genuine persona-specific content, relevant features
  highlighted, testimonials from that segment, segment-specific use cases.
- **URL:** `/for/[persona]/` or `/solutions/[industry]/`

## 8. Integrations
**Pattern:** "[your product] [other product] integration"
**Searches:** "slack asana integration", "zapier airtable"

Pages explaining how a product works with other tools.

- **Why it works:** captures users of other products, high intent, scales with
  the integration ecosystem.
- **Value required:** real integration details, setup instructions, use cases
  for the combination, a working integration (not vapourware).
- **URL:** `/integrations/[product]/` or `/connect/[product]/`

## 9. Glossary
**Pattern:** "what is [term]" / "[term] definition" / "[term] meaning"
**Searches:** "what is pSEO", "api definition"

Educational definitions of industry terms.

- **Why it works:** top-of-funnel awareness, establishes expertise, natural
  internal linking.
- **Value required:** clear accurate definitions, examples and context, related
  terms linked, more depth than a dictionary.
- **URL:** `/glossary/[term]/` or `/learn/[term]/`
- **Schema:** `DefinedTerm` where appropriate.

## 10. Translations
**Pattern:** the same content in multiple languages
**Searches:** "qué es pSEO", "was ist SEO"

Content translated and localised for other language markets.

- **Why it works:** opens new markets, often lower competition, multiplies
  reach.
- **Value required:** quality translation (not machine-only), cultural
  localisation, correct `hreflang`, native-speaker review.
- **URL:** `/[lang]/[page]/` e.g. `/es/`, `/de/`
- **Rules:** `hreflang` must be reciprocal and point to canonical URLs; never
  machine-translate and publish unreviewed.

## 11. Directory
**Pattern:** "[category] tools" / "[type] software" / "[category] companies"
**Searches:** "ai copywriting tools", "email marketing software"

Comprehensive directories listing options in a category.

- **Why it works:** research-phase capture, link-building magnet, natural for
  aggregators.
- **Value required:** comprehensive coverage, useful filtering and sorting,
  detail per listing (not just names), regular updates.
- **URL:** `/directory/[category]/` or `/[category]-directory/`

## 12. Profiles
**Pattern:** "[person/company name]" / "[entity] + [attribute]"
**Searches:** "stripe ceo", "airbnb founding story"

Profile pages about notable people, companies or entities.

- **Why it works:** informational intent traffic, builds topical authority.
- **Value required:** accurate sourced information, regularly updated, unique
  insight or aggregation, not a Wikipedia rehash.
- **URL:** `/people/[name]/` or `/companies/[name]/`

---

## Choosing Your Playbook

### Match to assets

| If the business has… | Consider… |
|---|---|
| Proprietary data | Stats, Directories, Profiles |
| Integrations / partners | Integrations |
| Design or creative output | Templates, Examples |
| Multiple customer segments | Personas |
| Local presence | Locations |
| A tool or calculator | Conversions |
| Real expertise | Glossary, Curation |
| International potential | Translations |
| Competitors worth comparing | Comparisons |

### Combine playbooks

- **Locations + Personas:** "commercial marine electricians in Auckland"
- **Curation + Locations:** "Best coworking spaces in San Diego"
- **Integrations + Personas:** "Slack for sales teams"
- **Glossary + Translations:** multi-language educational content

---

## Data Defensibility Hierarchy

Weakest to strongest. Aim as high up this list as the business allows.

1. **Proprietary** — you created it (original research, benchmarks)
2. **Product-derived** — generated by your users, jobs or transactions
3. **User-generated** — your community's contributions
4. **Licensed** — exclusive access you paid for
5. **Public** — anyone can use it (weakest; will produce thin pages)

If all a page has is public data, either add proprietary insight on top or do
not build the page.
