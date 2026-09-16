import posts from './blogPosts.json';

export { posts };
export const pageSize = 10;
export const archiveBases = ['blog', 'author/isaac', 'category/uncategorized'];
export const pageCount = Math.ceil(posts.length / pageSize);
export const archivePath = (base: string, page: number) => `/${base}/${page === 1 ? '' : `page/${page}/`}`;
export const archives = archiveBases.flatMap(base => Array.from({ length: pageCount }, (_, i) => ({
  slug: archivePath(base, i + 1).slice(1, -1), base, number: i + 1,
})));
