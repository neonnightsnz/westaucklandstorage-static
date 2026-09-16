import fs from 'node:fs';
const f = 'dist/why-choose-west-auckland-storage/index.html';
const h = fs.readFileSync(f, 'utf8');
const markers = ['<!DOCTYPE', '<html', '<head', '</head', '<body', '<header', '</header', '<main', '</main', '<footer', '</footer', '</body', '</html', '<title', 'article-header', 'blog-card', 'archive-heading-grid', 'locations-section', 'blog-grid'];
for (const m of markers) {
  const positions = [];
  let i = -1;
  while ((i = h.indexOf(m, i + 1)) !== -1) positions.push(i);
  console.log(m.padEnd(22), positions.join(', '));
}
