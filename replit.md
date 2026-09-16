# West Auckland Storage

## Run locally

This project is an Astro site using the existing West Auckland Storage logo and yard photography from the imported mirror.

```bash
npm run dev
```

The development server runs on port 5000 and is configured for the Replit preview proxy.

## Content notes

- The current site is a static marketing site with a quote form that opens the visitor’s email client.
- Facility language is intentionally conservative: slipway access is described as available when operational, and no unverified CCTV or 24/7 security claims are made.
- Real facility details used in the site: Span Farm Boat Yard, 20 Akatea Road, Glendene, Waitakere 0602; phone 09 818 4586; info@westaucklandstorage.co.nz.
- Blog article copy is maintained in `src/data/curated-blog.mjs` and compiled into `src/data/blogPosts.json` with `npm run build:blog`. The imported mirror copy is kept only as a raw snapshot in `src/data/blogPosts.raw.json` and is never shipped.
- All 34 articles were rewritten to the brand voice: no surveillance/CCTV or 24/7 claims, no invented testimonials, and no indoor-unit or shipping-container language.
- Every page now carries Open Graph/Twitter meta and JSON-LD `AutomotiveBusiness` structured data (NAP, address, area served) via `src/layouts/PageLayout.astro`. A branded `noindex` 404 page (`src/pages/404.astro`) and an RSS 2.0 feed (`src/pages/rss.xml.ts`) were added in the Phase 1 foundations work.
- Social card and app icons live in `public/images/` (`og-default.jpg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and are regenerated with `npm run build:assets`.