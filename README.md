# West Auckland Storage

Astro marketing site with the original WordPress blog restored into the current design.

- `npm ci` installs the locked dependencies (Node 22+).
- `npm run dev` starts the local site on port 5000.
- `npm run build` generates the static site in `dist`.
- `npm run check:site` verifies built routes, article copy, archives, links and images.
- `npm run import:blog` imports the 34 posts and their images from the checked-in `westaucklandstorage.co.nz` mirror, writing a raw provenance snapshot to `src/data/blogPosts.raw.json`.
- `npm run build:blog` rebuilds `src/data/blogPosts.json` from the brand-aligned copy in `src/data/curated-blog.mjs`.
- `npm run build:assets` regenerates the social-sharing card and app icons in `public/images/` from `public/images/boat-hardstand.jpg` and `public/favicon.svg` (uses `sharp`). The generated files are committed, so this is only needed after a design change.

The original article URLs and ordering are preserved, with four pages each for the blog, Isaac's author archive and the Uncategorized archive. `/sitemap/` lists the complete site; `/sitemap.xml` (with `<lastmod>`) and `/robots.txt` support crawlers. The legacy `/services/contact/` address redirects to `/contact/`.

`src/layouts/PageLayout.astro` adds Open Graph and Twitter Card tags, a canonical URL, a link to the `/rss.xml` feed, app-icon/manifest links, and JSON-LD `AutomotiveBusiness` structured data for every page. `src/pages/404.astro` is a branded, `noindex` not-found page (Cloudflare Pages serves it automatically), and `src/pages/rss.xml.ts` publishes the blog as RSS 2.0.

The mirror's Swanson article was a 404. Its full published text was recovered from post 343 in the supplied WordPress backup and saved in `src/data/recovered-swanson.json` so imports remain reproducible without the backup.

Original article URLs, slugs and dates are preserved so existing links keep working. The article copy itself has been rewritten to the brand voice in `brandvoice-visual-identity.md`: the mirror's original optimised copy is kept only as a raw import snapshot (`blogPosts.raw.json`), and the shipped copy lives in `src/data/curated-blog.mjs` and is compiled into `blogPosts.json` by `npm run build:blog`. That rewrite removes the security claims, invented testimonials and indoor/container storage language that never matched the outdoor boat yard. Run `npm run build:blog` after any `npm run import:blog` to reapply the curated copy.

## Brand and design system

Read `brandvoice-visual-identity.md` before changing copy, colour or imagery.

- `design-system/west-auckland-storage/tokens.css` is the single source of truth for colour, type, spacing and layout tokens.
- `src/styles/global.css` and `src/styles/design-system.css` both import that token file, so the marketing site and the `/design-system/` reference page share one palette.
- Display type is Barlow Condensed; body type is DM Sans. Primary `#145693`, bright accent `#128BFB`, sky `#A5D2FD`.
- Keep the palette to marine blues and quiet neutrals. Do not add golds, greens, reds or gradients.
- Lead pages with location, price and slipway. Describe slipway access conditionally, and never promise security or facilities that are not currently in place.

Local mirror dumps, the WordPress backup and saved-page artifacts (`westaucklandstorage-static/`, `westaucklandstorage-wpress/`, the saved `.html` + `_files/`) are not needed to build the site and are ignored in `.gitignore`.

## Cloudflare Pages

Build command: `npm run build`. Output directory: `dist`. Root directory: repository root. Node version: 22 or later. `wrangler.jsonc` fixes the publish directory so the source mirror cannot be shipped as the site.

The homepage is `src/pages/index.astro`, shared with the Replit preview. Publish only the Astro output, never the repository root. Original WordPress slugs remain the canonical page paths; old `/westaucklandstorage.co.nz/…` and `/west-auckland-storeage/westaucklandstorage.co.nz/…` mirror URLs permanently redirect to those paths through `public/_redirects`. Mirror source files remain available for repeatable imports but are not deployed.
