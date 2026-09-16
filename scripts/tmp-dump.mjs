import fs from 'node:fs';
const posts = JSON.parse(fs.readFileSync('src/data/blogPosts.json', 'utf8'));
const wanted = process.argv.slice(2).map(Number);
for (const i of wanted) {
  const p = posts[i];
  console.log('\n===== ' + i + ' | ' + p.slug + ' =====');
  console.log('TITLE: ' + p.title);
  console.log('DATE: ' + p.date + ' (' + p.dateLabel + ')');
  console.log('IMAGE: ' + p.image + ' | ALT: ' + p.imageAlt);
  console.log('EXCERPT: ' + p.excerpt);
  console.log('--- CONTENT ---');
  console.log(p.content);
}
