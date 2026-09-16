import fs from 'node:fs';
const posts = JSON.parse(fs.readFileSync('src/data/blogPosts.json', 'utf8'));
const banned = /premier|state-of-the-art|world-class|luxury|seamless|cutting-edge|unrivalled|industry-leading|24\/7|cctv|surveillance|alarmed|advanced security|top-notch|unparalleled|best-in-class|premium|superior|leading|expert|affordable luxury|bespoke|trusted storage solution|peace of mind|state of the art/gi;
for (const [i, p] of posts.entries()) {
  const text = p.title + ' ' + p.content.replace(/<[^>]*>/g, ' ');
  const hits = [...text.matchAll(banned)].map(m => m[0].toLowerCase());
  console.log(`${String(i).padStart(2)} | ${p.slug} | len=${p.content.length} | hits=${hits.length ? [...new Set(hits)].join(',') : '-'}`);
}
