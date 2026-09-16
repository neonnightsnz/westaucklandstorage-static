# CONTEXT

Domain glossary for West Auckland Storage. These terms name the seams in this
codebase — use them in code, commits and architecture reviews instead of
invented synonyms.

## The business

- **West Auckland Storage** — the trading name. What customers see; what the
  site is branded as.
- **Span Farm Boat Yard** — the yard's own name. Used where the *place* is the
  point (footer, directions, about).
- **Span Farm Boat Yard Ltd** — the legal entity behind the trading name. Only
  used in the footer strapline and structured data.
- **Yard** — the single physical site at 20 Akatea Road, Glendene. There is
  exactly one; "our yards" is wrong.
- **NAP** — Name, address, phone. The canonical business facts, including
  email, postal address, geo coordinates and the maps link. Must be identical
  everywhere it appears, including structured data.

## Storage

- **Storage option** — one of the bookable products (boat storage, caravan
  storage, vehicle storage, …). Owned by `storageOptions` in `src/data/sitePages.ts`.
- **Slipway** — the yard's launching and retrieval facility. Access is
  conditional and time-dependent; never promise it.
- **Suburb** — a named West Auckland neighbourhood we serve. A suburb may or
  may not have a published guide.

## Content

- **Article** — a published piece in the blog. Has slug, title, date, image,
  content and a derived excerpt.
- **Local guide** — an article in the `local-guides` category, tied to a suburb.
- **Category** — one of `local-guides`, `storage-options`, `storage-tips`.
  Owned by `src/data/blog.ts`.
- **Archive** — a paginated listing of articles: the blog, an author, or a
  category. Owned by `src/data/blog.ts`.
- **Marketing page** — a hand-written page with fixed copy: `/about/`,
  `/services/`, `/contact/`, `/storage-near-you/`.
- **Enquiry** — a submitted contact form, handled by `functions/api/contact.js`.

## Architecture vocabulary

Use these exactly. Not "component", "service", "API", "boundary" or "layer".

- **module** — a unit with an interface and an implementation.
- **interface** — what a caller must know to use a module.
- **depth / deep / shallow** — a deep module hides a lot behind a small
  interface; a shallow one's interface is nearly as wide as its implementation.
- **seam** — a place where an interface can be substituted without editing callers.
- **adapter** — an implementation of a seam. One adapter is a hypothetical seam;
  two make it real.
- **leverage** — one interface serving many call sites.
- **locality** — related changes land in one module.
