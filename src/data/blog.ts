import posts from './blogPosts.json' with { type: 'json' };
import { storageOptions } from './sitePages.ts';
import { locationGroups } from './locations.ts';
import { guidedSuburbs } from './locations.ts';

export { posts };
export const pageSize = 10;

// Real editorial categories replace the single "Uncategorized" archive.
export const categories = [
  {
    slug: 'local-guides',
    label: 'Local guides',
    description: 'Practical storage guides for West Auckland suburbs, so your boat, caravan or vehicle stays nearby and close to home.',
  },
  {
    slug: 'storage-options',
    label: 'Storage options',
    description: 'The outdoor storage options at our Glendene yard: what we store, how boat, caravan and vehicle storage works, and what to tell us before you arrive.',
  },
  {
    slug: 'storage-tips',
    label: 'Storage tips',
    description: 'Practical storage tips and straightforward guidance to look after your boat, caravan and gear while it is stored outdoors.',
  },
];

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

// "Storage near <suburb>" locations — the neighbourhood series, listed once in
// src/data/locations.ts so the hub, the guides and the /storage-near-<suburb>/
// pages cannot drift apart. A suburb listed there with a null slug is served but
// has no guide, so it is deliberately absent here and falls through to storage
// tips rather than claiming to be a local guide.
const locationSlugs = new Set(guidedSuburbs.map((suburb) => suburb.slug));

const storageSlugs = new Set(storageOptions.map((option) => option.slug));

export const categoryFor = (slug: string): string => {
  if (storageSlugs.has(slug)) return 'storage-options';
  if (locationSlugs.has(slug)) return 'local-guides';
  return 'storage-tips';
};

export const categoryLabel = (slug: string): string => categoryBySlug.get(slug)?.label ?? 'Storage tips';

// Each post annotated with its category, so archive pages can filter on it.
export const postsWithCategory = posts.map((post) => ({ ...post, category: categoryFor(post.slug) }));

export const archivePath = (base: string, page: number) => `/${base}/${page === 1 ? '' : `page/${page}/`}`;

const archiveDefinitions = [
  { base: 'blog', label: 'From the yard', description: 'Boat, caravan and vehicle storage advice, plus practical local guides for West Auckland owners — written from the yard at 20 Akatea Road, Glendene.', items: postsWithCategory },
  { base: 'author/isaac', label: 'Articles by Isaac', description: 'Storage advice and local West Auckland guides written by Isaac at Span Farm Boat Yard — notes on boats, caravans, trailers and vehicles.', items: postsWithCategory },
  ...categories.map((category) => ({
    base: `category/${category.slug}`,
    label: category.label,
    description: category.description,
    items: postsWithCategory.filter((post) => post.category === category.slug),
  })),
];

export const archives = archiveDefinitions.flatMap((definition) => {
  const pageCount = Math.max(1, Math.ceil(definition.items.length / pageSize));
  return Array.from({ length: pageCount }, (_, index) => ({
    slug: archivePath(definition.base, index + 1).slice(1, -1),
    base: definition.base,
    label: definition.label,
    description: definition.description,
    number: index + 1,
    pageCount,
    total: definition.items.length,
    items: definition.items,
  }));
});
