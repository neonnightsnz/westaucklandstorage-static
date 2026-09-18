/**
 * Shared helpers for the build-time site checks.
 *
 * `check-site.mjs` and `check-contact.mjs` both assert against the built HTML
 * in `dist/`, and `audit-seo.mjs` inventories the same markup. Keeping the
 * readers and the meta/structured-data assertions in one place means the
 * canonical, Open Graph, Twitter Card, JSON-LD and RSS checks cannot drift
 * apart between scripts.
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

export const distDir = 'dist';

const decodeEntities = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

/** Parse a tag's attributes into an object, decoding HTML entities. */
export const attrMap = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(([, key, value]) => [key, decodeEntities(value)]),
  );

/** Read a built HTML file from `dist/`, accepting either a route or a file path. */
export function readDistHtml(route) {
  const normalised = route.replaceAll('\\', '/').replace(/^\//, '');
  const candidates = [
    path.join(distDir, normalised),
    path.join(distDir, normalised, 'index.html'),
  ];
  const file = candidates.find((candidate) => candidate.endsWith('.html') && fs.existsSync(candidate));
  assert.ok(file, `Missing built page: ${route}`);
  return fs.readFileSync(file, 'utf8');
}

/** Every `.html` file in `dist/`, relative to the build output root. */
export function listDistHtml() {
  return fs.readdirSync(distDir, { recursive: true }).filter((file) => file.endsWith('.html'));
}

/** Extract `<meta>`/`<link>` attributes for a built page. */
export function metaTags(html) {
  return [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(([tag]) => attrMap(tag));
}

/** Extract JSON-LD nodes (flattening `@graph`) from a built page. */
export function structuredData(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(
    ([, text]) => {
      try {
        const value = JSON.parse(text);
        return value['@graph'] ?? [value];
      } catch {
        return [];
      }
    },
  );
}

/**
 * Assert the head tags every indexable page must carry.
 * Shared by check-site.mjs and audit-seo.mjs.
 */
export function assertPageMetadata(html, label = 'page') {
  const tags = metaTags(html);
  assert.ok(
    tags.some((tag) => tag.rel === 'canonical' && tag.href),
    `${label} must declare a canonical URL`,
  );
  assert.ok(
    tags.some((tag) => tag.property === 'og:title'),
    `${label} must include Open Graph tags`,
  );
  assert.ok(
    tags.some((tag) => tag.name === 'twitter:card'),
    `${label} must include Twitter Card tags`,
  );
  assert.ok(
    tags.some((tag) => tag.name === 'description' && tag.content),
    `${label} must include a meta description`,
  );
  return { tags, schema: structuredData(html) };
}

/** Assert the homepage-level requirements checked by check-site.mjs. */
export function assertHomepageMetadata(homepage) {
  const { tags, schema } = assertPageMetadata(homepage, 'Homepage');
  assert.ok(schema.length > 0, 'Homepage must include LocalBusiness structured data');
  assert.ok(
    homepage.includes('rel="alternate" type="application/rss+xml"'),
    'Homepage must link the RSS feed',
  );
  return tags;
}

/** Assert the RSS feed on disk is present and parseable. */
export function assertRssFeed() {
  assert.ok(fs.existsSync(path.join(distDir, 'rss.xml')), 'The RSS feed must be built');
  const xml = fs.readFileSync(path.join(distDir, 'rss.xml'), 'utf8');
  assert.ok(xml.includes('<rss version="2.0"'), 'The RSS feed must declare the RSS 2.0 root element');
  assert.ok(xml.includes('<atom:link'), 'The RSS feed must self-reference its Atom link');
  return xml;
}

/** Sitemap `<loc>` pathnames from the built sitemap. */
export function sitemapPaths(file = 'dist/sitemap.xml') {
  const xml = fs.readFileSync(file, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
}
