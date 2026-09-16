import fs from 'node:fs';
import path from 'node:path';
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk('dist').filter((f) => f.endsWith('.html'));
const bad = [];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const n = (h.match(/id="site-nav"/g) || []).length;
  if (n !== 1 && !f.includes('design-system') && !f.includes('services\\contact')) bad.push(`${n}  ${f}`);
}
console.log('bad count:', bad.length);
console.log(bad.slice(0, 40).join('\n'));
