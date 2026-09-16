import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import posts from '../src/data/blogPosts.json' with { type: 'json' };

const files = fs.readdirSync('dist', { recursive: true }).filter(file => file.endsWith('.html'));
const broken = [];
assert.ok(!fs.existsSync('index.html'), 'The copier splash page must not be a deployment entry point');
const homepage = fs.readFileSync('dist/index.html', 'utf8');
assert.ok(homepage.includes('class="hero"'), 'The Replit landing page must be the homepage');
assert.ok(!homepage.includes('HTTrack'), 'The homepage must not contain the copier splash');
assert.ok(!fs.existsSync('dist/westaucklandstorage.co.nz'), 'Do not publish the original mirror');
const redirects = fs.readFileSync('dist/_redirects', 'utf8');
assert.ok(redirects.includes('/westaucklandstorage.co.nz/ / 301'));
assert.ok(redirects.includes('/westaucklandstorage.co.nz/* /:splat 301'));
assert.ok(redirects.includes('/west-auckland-storeage/westaucklandstorage.co.nz/* /:splat 301'));
for (const file of files) {
  const html = fs.readFileSync(path.join('dist', file), 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)) {
    const target = path.join('dist', decodeURIComponent(url));
    if (!fs.existsSync(target) && !fs.existsSync(path.join(target, 'index.html'))) broken.push(`${file}: ${url}`);
  }
}
assert.deepEqual(broken, [], 'Broken internal links or images');
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
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
for (const base of ['blog', 'author/isaac', 'category/uncategorized']) {
  const listed = [];
  for (let i = 1; i <= 4; i++) {
    const route = `${base}/${i === 1 ? '' : `page/${i}/`}`;
    const html = fs.readFileSync(`dist/${route}index.html`, 'utf8');
    assert.equal((html.match(/class="blog-card"/g) ?? []).length, i === 4 ? 4 : 10);
    for (const post of posts) if (html.includes(`href="/${post.slug}/"`)) listed.push(post.slug);
  }
  assert.equal(listed.length, 34);
  assert.equal(new Set(listed).size, 34);
}
console.log(`Verified ${files.length} HTML pages, ${urls.length} sitemap entries, 34 complete articles, all archive pages and internal links/images.`);
