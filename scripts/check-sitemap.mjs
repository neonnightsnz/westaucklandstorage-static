/**
 * Build-time checks for the sitemap route.
 *
 * The route deduplicates paths, falls back to the production origin when
 * `site` is unavailable and deliberately omits <lastmod>, since publication
 * dates are not modification dates. All three behaviours are asserted here.
 */
import assert from 'node:assert/strict';
import { GET } from '../src/pages/sitemap.xml.ts';
import { pages } from '../src/data/sitePages.ts';
import { posts } from '../src/data/blog.ts';

async function sitemapFor(site) {
  const response = await GET({ site });
  assert.equal(response.headers.get('Content-Type'), 'application/xml; charset=utf-8');
  return response.text();
}

const fallback = await sitemapFor(undefined);
assert.ok(
  fallback.includes('<loc>https://westaucklandstorage.co.nz/</loc>'),
  'Without a configured site the sitemap must fall back to the production origin',
);
assert.ok(fallback.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Sitemap must declare its XML prolog');
assert.ok(
  fallback.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
  'Sitemap must declare the sitemap.org namespace',
);
assert.ok(!fallback.includes('<lastmod>'), 'Sitemap must not claim modification dates it does not maintain');

const custom = await sitemapFor({ origin: 'https://example.test' });
const locs = [...custom.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(locs.length > 0, 'Sitemap must contain at least one URL');
assert.ok(
  locs.every((loc) => loc.startsWith('https://example.test/')),
  'Every sitemap URL must be absolute and use the configured origin',
);
assert.ok(
  locs.every((loc) => !loc.includes('westaucklandstorage.co.nz')),
  'A configured origin must replace the fallback origin everywhere',
);
assert.equal(
  new Set(locs).size,
  locs.length,
  'Sitemap must not contain duplicate URLs',
);
assert.ok(!custom.includes('<lastmod>'), 'Sitemap must not emit <lastmod>');

const paths = locs.map((loc) => new URL(loc).pathname);
for (const path of ['/', '/sitemap/', '/pay-your-account/']) {
  assert.ok(paths.includes(path), `Sitemap must list the core route ${path}`);
}
for (const page of pages) {
  assert.ok(paths.includes(`/${page.slug}/`), `Sitemap must list the page /${page.slug}/`);
}
for (const post of posts) {
  assert.ok(paths.includes(`/${post.slug}/`), `Sitemap must list the article /${post.slug}/`);
}
// Paths always end in a slash so the trailing-slash redirects are not needed.
assert.ok(paths.every((path) => path.endsWith('/')), 'Every sitemap path must end with a slash');

console.log(`Verified sitemap deduplication, origin fallback and ${locs.length} URLs.`);
