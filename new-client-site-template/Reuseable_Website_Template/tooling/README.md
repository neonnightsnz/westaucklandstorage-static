# Reusable project tooling

These scripts are portable starting points extracted from the West Auckland Storage Astro project. They are kept here for reuse in future client sites; they are not automatically wired into this template.

## Included

- `check-contact.mjs` — provider-mocked validation for a contact endpoint.
- `check-sitemap.mjs` — sitemap URL, origin, deduplication and route checks.
- `check-site.mjs` — built-site smoke checks for metadata, navigation, links, images and forms.
- `check-blog.mjs` / `check-blog-sync.mjs` — article completeness and curated-content checks.
- `import-blog.mjs` — optional importer for a checked-in WordPress mirror.
- `audit-seo.mjs` — compares a historical mirror with the current `dist` output.
- `lib/site-checks.mjs` — shared HTML inspection helpers.

## Before using in a new project

1. Copy the scripts into the new project's `scripts/` directory.
2. Update imports for the project's `src/`, `functions/`, `public/`, `dist/` and data paths.
3. Remove assertions that describe the previous client's routes, copy, service counts or redirects.
4. Add only the checks that match the new project's actual behaviour.
5. Keep historical mirrors outside the deployment root and do not publish them.

The importer and SEO audit are optional maintenance tools. They are not required for a normal production build.