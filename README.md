# West Auckland Storage

Astro marketing site with the original WordPress blog restored into the current design.

- `npm ci` installs the locked dependencies (Node 22+).
- `npm run dev` starts the local site on port 5000.
- `npm run build` generates the static site in `dist`.
- `npm run check:site` verifies built routes, article copy, archives, links and images.
- `npm run import:blog` imports the 34 posts and images from the checked-in `westaucklandstorage.co.nz` mirror.

The original article URLs and ordering are preserved, with four pages each for the blog, Isaac's author archive and the Uncategorized archive. `/sitemap/` lists the complete site; `/sitemap.xml` and `/robots.txt` support crawlers. The legacy `/services/contact/` address redirects to `/contact/`.

The mirror's Swanson article was a 404. Its full published text was recovered from post 343 in the supplied WordPress backup and saved in `src/data/recovered-swanson.json` so imports remain reproducible without the backup. Article copy is preserved as historical source content; current core service and contact pages retain their existing copy.

## Cloudflare Pages

Build command: `npm run build`. Output directory: `dist`. Root directory: repository root. Node version: 22 or later. `wrangler.jsonc` fixes the publish directory so the source mirror cannot be shipped as the site.

The homepage is `src/pages/index.astro`, shared with the Replit preview. Publish only the Astro output, never the repository root. Original WordPress slugs remain the canonical page paths; old `/westaucklandstorage.co.nz/…` and `/west-auckland-storeage/westaucklandstorage.co.nz/…` mirror URLs permanently redirect to those paths through `public/_redirects`. Mirror source files remain available for repeatable imports but are not deployed.
