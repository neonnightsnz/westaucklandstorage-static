// Fills in the article images that shipped with empty alt text, using the
// reviewed descriptions in src/data/article-image-alts.mjs.
//
// Only empty values are written: an article whose alt text a person has already
// written is left untouched, so this script is safe to re-run after new articles
// are imported. Run with: npm run build:article-alts
import fs from 'node:fs';
import { articleImageAlts } from '../src/data/article-image-alts.mjs';

const path = 'src/data/blogPosts.json';
const posts = JSON.parse(fs.readFileSync(path, 'utf8'));

const missing = posts.filter((post) => !post.imageAlt.trim()).map((post) => post.slug);
const uncovered = missing.filter((slug) => !articleImageAlts[slug]);
if (uncovered.length) {
  throw new Error(`No reviewed alt text for: ${uncovered.join(', ')}`);
}

let filled = 0;
const updated = posts.map((post) => {
  if (post.imageAlt.trim()) return post;
  filled += 1;
  return { ...post, imageAlt: articleImageAlts[post.slug] };
});

fs.writeFileSync(path, `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Filled ${filled} of ${posts.length} article image alt values (${missing.length} were empty).`);
