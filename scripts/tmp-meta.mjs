import fs from 'node:fs';
const posts = JSON.parse(fs.readFileSync('src/data/blogPosts.json', 'utf8'));
for (const [i, p] of posts.entries()) {
  console.log([i, p.slug, p.date, p.dateLabel, p.image, p.imageAlt, p.title].join(' || '));
}
