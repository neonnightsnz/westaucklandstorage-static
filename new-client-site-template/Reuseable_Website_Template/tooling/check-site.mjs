import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import posts from '../src/data/blogPosts.json' with { type: 'json' };
import {
  assertHomepageMetadata,
  assertRssFeed,
  listDistHtml,
  readDistHtml,
  sitemapPaths,
} from './lib/site-checks.mjs';
const files = listDistHtml();
const broken = [];
assert.ok(!fs.existsSync('index.html'), 'The copier splash page must not be a deployment entry point');
const homepage = readDistHtml('index.html');
assert.ok(homepage.includes('class="hero"'), 'The Replit landing page must be the homepage');
assert.ok(!homepage.includes('HTTrack'), 'The homepage must not contain the copier splash');
assert.ok(!fs.existsSync('dist/westaucklandstorage.co.nz'), 'Do not publish the original mirror');
const redirects = fs.readFileSync('dist/_redirects', 'utf8');
assert.ok(redirects.includes('/westaucklandstorage.co.nz/ / 301'));
assert.ok(redirects.includes('/westaucklandstorage.co.nz/* /:splat 301'));
assert.ok(redirects.includes('/west-auckland-storeage/westaucklandstorage.co.nz/* /:splat 301'));
assert.ok(fs.existsSync('dist/404.html'), 'A branded 404 page must be built');
const notFound = fs.readFileSync('dist/404.html', 'utf8');
assert.ok(notFound.includes('Page not found'), 'The 404 page must identify itself');
assertHomepageMetadata(homepage);
assertRssFeed();
for (const file of files) {
  const html = fs.readFileSync(path.join('dist', file), 'utf8');
  for (const [, image] of html.matchAll(/<img[^>]*src="([^"]+)"/g)) assert.ok(!image.endsWith('.html'), `Image with incorrect MIME extension: ${file}`);
  if (!['design-system/index.html', 'services/contact/index.html'].includes(file.replaceAll('\\', '/'))) {
    assert.equal((html.match(/id="site-nav"/g) ?? []).length, 1, `Shared navigation missing or duplicated: ${file}`);
    assert.ok(html.includes('Skip to content'), `Skip link missing: ${file}`);
  }
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)) {
    const target = path.join('dist', decodeURIComponent(url));
    if (!fs.existsSync(target) && !fs.existsSync(path.join(target, 'index.html'))) broken.push(`${file}: ${url}`);
  }
}
const servicesHtml = readDistHtml('services/');
assert.equal((servicesHtml.match(/class="service-card"/g) ?? []).length, 9, 'Services must expose all storage options');
for (const route of ['', 'contact/']) {
  const html = readDistHtml(route);
  assert.equal((html.match(/<form[^>]*data-contact-form/g) ?? []).length, 1, 'Use one enquiry form per page');
  assert.ok(html.includes('Send enquiry'), 'Form must offer a clear send action');
}
assert.deepEqual(broken, [], 'Broken internal links or images');
const urls = sitemapPaths();
assert.ok(urls.every(url => !url.includes('westaucklandstorage.co.nz')), 'Sitemap must use original paths, not mirror prefixes');
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap entries');
for (const url of urls) assert.ok(fs.existsSync(path.join('dist', url, 'index.html')), `Missing sitemap target: ${url}`);
for (const post of posts) {
  assert.ok(urls.includes(`/${post.slug}/`), `Article absent from sitemap: ${post.slug}`);
  const html = fs.readFileSync(`dist/${post.slug}/index.html`, 'utf8');
  assert.ok(html.includes(post.date), `Missing article date: ${post.slug}`);
  assert.ok(post.content.length > 1000, `Incomplete article: ${post.slug}`);
  const paragraphs = [...post.content.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)];
  for (const [, paragraph] of paragraphs) assert.ok(html.includes(paragraph), `Lost original paragraph: ${post.slug}`);
}
// Archive coverage mirrors the taxonomy in src/data/blog.ts.
const archiveExpectations = {
  'blog': 34,
  'author/isaac': 34,
  'category/local-guides': 19,
  'category/storage-options': 9,
  'category/storage-tips': 6,
};
for (const [base, total] of Object.entries(archiveExpectations)) {
  const archivePages = Math.max(1, Math.ceil(total / 10));
  const listed = [];
  for (let i = 1; i <= archivePages; i++) {
    const route = `${base}/${i === 1 ? '' : `page/${i}/`}`;
    const html = readDistHtml(route);
    assert.equal((html.match(/class="blog-card"/g) ?? []).length, Math.min(10, total - (i - 1) * 10), `Archive ${base} page ${i} card count`);
    for (const post of posts) if (html.includes(`href="/${post.slug}/"`)) listed.push(post.slug);
  }
  assert.equal(listed.length, total, `Archive ${base} must list ${total} articles`);
  assert.equal(new Set(listed).size, total, `Archive ${base} must not duplicate articles`);
}
const hub = readDistHtml('storage-near-you/');
assert.equal((hub.match(/class="location-list"/g) ?? []).length, 4, 'Location hub must group suburbs into 4 areas');
assert.equal((hub.match(/class="location-item"/g) ?? []).length, 1, 'Suburbs without a guide must be listed, not linked');
assert.equal((hub.match(/href="\/(?:west-auckland-storage|discovering-west-auckland)/g) ?? []).length, 19, 'Location hub must link all 19 suburb guides');
console.log(`Verified ${files.length} HTML pages, ${urls.length} sitemap entries, 34 complete articles, all archive pages and internal links/images.`);
