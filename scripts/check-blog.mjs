/**
 * Build-time checks for the blog taxonomy and archive pagination.
 *
 * The archive maths in src/data/blog.ts drives every archive route, the
 * sitemap and the RSS feed, so the boundaries (page 1 path shape, the last
 * partial page, category assignment) are asserted against the built dist
 * output rather than left to the sitemap check to discover.
 */
import assert from 'node:assert/strict';
import { pageSize, archives, categories, categoryFor } from '../src/data/blog.ts';
const allArchives = archives;

const byBase = new Map();
for (const archive of archives) {
  const list = byBase.get(archive.base) ?? [];
  list.push(archive);
  byBase.set(archive.base, list);
}

// The taxonomy counts currently shipped (34 posts, 19 local guides, 9 storage
// options, 6 storage tips) must match the archive totals.
const expectedTotals = {
  blog: 34,
  'author/isaac': 34,
  'category/local-guides': 19,
  'category/storage-options': 9,
  'category/storage-tips': 6,
};

assert.equal(pageSize, 10, 'Archive page size must stay at 10 for the build-time checks');

for (const [base, total] of Object.entries(expectedTotals)) {
  const pages = byBase.get(base);
  assert.ok(pages, `Missing archive definition for ${base}`);
  assert.equal(pages[0].total, total, `Archive ${base} must contain ${total} articles`);
  assert.equal(
    pages.length,
    Math.max(1, Math.ceil(total / pageSize)),
    `Archive ${base} must paginate to ${Math.max(1, Math.ceil(total / pageSize))} page(s)`,
  );
  assert.equal(pages[0].number, 1);
  assert.equal(pages[0].pageCount, pages.length);
  // Page 1 is the bare base path; later pages use the page/N/ suffix.
  assert.equal(pages[0].slug, base);
  for (const page of pages.slice(1)) {
    assert.equal(page.slug, `${base}/page/${page.number}`);
    assert.equal(page.pageCount, pages.length);
    assert.equal(page.total, total);
  }
  // Every article appears exactly once across the archive. Each archive page
  // carries the full item list, so dedupe per page before counting.
  const seen = [...new Set(pages.flatMap((page) => page.items.map((post) => post.slug)))];
  assert.equal(seen.length, total, `Archive ${base} must list ${total} articles`);
  assert.equal(new Set(seen).size, total, `Archive ${base} must not duplicate articles`);
}

// Categories partition the posts: every post belongs to exactly one.
const categorySlugs = categories.map((category) => category.slug);
const everyPostCategory = new Set(
  allArchives
    .filter((archive) => archive.base === 'blog')
    .flatMap((archive) => archive.items.map((post) => post.category)),
);
assert.equal(
  everyPostCategory.size,
  categorySlugs.length,
  'Every declared category must be represented by at least one article',
);
assert.deepEqual(
  [...everyPostCategory].sort(),
  [...categorySlugs].sort(),
  'Article categories must match the declared taxonomy',
);

// Category assignment: locations are local guides, storage options are not.
assert.equal(
  categoryFor('west-auckland-storage-your-trusted-storage-in-huia'),
  'local-guides',
  'Suburb guides must be filed under local guides',
);
assert.equal(
  categoryFor('discovering-west-auckland-storage-the-perfect-solution-for-titirangi-residents'),
  'local-guides',
  'The Titirangi guide must be filed under local guides',
);
assert.equal(
  categoryFor('boat-storage-at-west-auckland-storage'),
  'storage-options',
  'Storage option pages must be filed under storage options',
);
assert.equal(
  categoryFor('some-unclassified-post'),
  'storage-tips',
  'Unclassified articles must fall back to storage tips',
);

// Pagination maths rounds up rather than truncating.
const roundedUp = allArchives.filter((archive) => archive.total % pageSize !== 0);
assert.ok(roundedUp.length > 0, 'Expected at least one archive with a partial final page');
for (const archive of roundedUp) {
  assert.equal(
    archive.pageCount,
    Math.floor(archive.total / pageSize) + 1,
    `Archive ${archive.base} must round its final page up`,
  );
  assert.equal(
    archive.total - pageSize * (archive.pageCount - 1) > 0,
    true,
    `Archive ${archive.base} partial final page must be non-empty`,
  );
  assert.equal(
    archive.items.length,
    archive.total,
    `Archive ${archive.base} pages must carry the full article list`,
  );
}

console.log(`Verified ${allArchives.length} archive pages across ${Object.keys(expectedTotals).length} archives.`);
