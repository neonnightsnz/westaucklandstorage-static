import posts from './blogPosts.json';
import { storageOptions } from './sitePages';

export { posts };
export const pageSize = 10;

// Real editorial categories replace the single "Uncategorized" archive.
export const categories = [
  {
    slug: 'local-guides',
    label: 'Local guides',
    description: 'Storage notes and practical guides for West Auckland suburbs and neighbourhoods.',
  },
  {
    slug: 'storage-options',
    label: 'Storage options',
    description: 'What we store at the yard, and how boat, caravan and vehicle storage works.',
  },
  {
    slug: 'storage-tips',
    label: 'Storage tips',
    description: 'Straightforward advice for looking after your boat, caravan and gear.',
  },
];

const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));

// "Storage near <suburb>" locations — the neighbourhood series.
const locationSlugs = new Set([
  'west-auckland-storage-your-reliable-storage-solution-in-laingholm',
  'west-auckland-storage-your-trusted-storage-in-huia',
  'west-auckland-storage-secure-storage-in-sunnyvale',
  'west-auckland-storage-your-storage-solution-in-new-lynn',
  'west-auckland-storage-reliable-storage-in-massey',
  'west-auckland-storage-trusted-storage-solutions-in-west-harbour',
  'west-auckland-storage-your-storage-solution-in-hobsonville',
  'west-auckland-storage-reliable-storage-in-lincoln',
  'west-auckland-storage-your-trusted-storage-solution-in-green-bay',
  'west-auckland-storage-your-reliable-storage-solution-in-kelston',
  'west-auckland-storage-your-trusted-storage-solution-in-swanson',
  'west-auckland-storage-your-trusted-storage-solution-in-whenuapai',
  'west-auckland-storage-your-premier-storage-solution-in-glendene',
  'west-auckland-storage-your-ideal-storage-solution-in-western-heights',
  'west-auckland-storage-your-trusted-storage-solution-in-glen-eden',
  'west-auckland-storage-the-perfect-storage-solution-for-herald-island-residents',
  'west-auckland-storage-your-go-to-storage-solution-in-te-atatu-peninsula',
  'west-auckland-storage-the-ideal-choice-for-te-atatu-south-residents',
  'discovering-west-auckland-storage-the-perfect-solution-for-titirangi-residents',
]);

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
  { base: 'blog', label: 'From the yard', description: 'Boat, caravan and vehicle storage advice, and guides for our West Auckland neighbours.', items: postsWithCategory },
  { base: 'author/isaac', label: 'Articles by Isaac', description: 'Storage notes and local guides written from the yard.', items: postsWithCategory },
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
