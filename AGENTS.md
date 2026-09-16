# Project instructions

## Design reference

Use `references/design/West-Auckland-Storage.html` as the primary visual reference for redesign work. Before editing the design, confirm you can access it and describe its layout, typography, colours, spacing, photographic hero and navigation. Match these closely and compare the rendered Astro site against the reference at desktop and mobile sizes before finishing.

Read `brandvoice-visual-identity.md` for current business facts and copy constraints. The saved reference is a visual target, not authority for outdated security claims or facilities. Preserve current working routes, blog content and enquiry behaviour.

The reference and its assets belong outside `public/` and must not be deployed. See `references/design/README.md` for preview instructions.

## Application and deployment

The application lives at the repository root: `src/` contains Astro code and `public/` contains published assets. The WordPress mirrors and nested local copies are import/reference material, not deployment roots.

Cloudflare Pages must run `npm run build` from the repository root and publish `dist`. Keep `pages_build_output_dir` in `wrangler.jsonc` set to `./dist`. The build command must also be configured in the Cloudflare Pages project settings; the output-directory setting alone does not run a build. Do not commit `dist` or publish the repository root.

Validate application changes with `npm run build` and `npm run check:site`.
