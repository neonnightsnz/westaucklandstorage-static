// Rebuild src/data/blogPosts.json from the curated, brand-aligned copy in
// src/data/curated-blog.mjs, preserving each article's slug, date and image.
// Run with: npm run build:blog
import fs from 'node:fs';
import { blogContent } from '../src/data/curated-blog.mjs';

const posts = JSON.parse(fs.readFileSync('src/data/blogPosts.json', 'utf8'));

// Claims the brand guide bans outright, plus the fabricated-testimonial pattern
// the original WordPress copy used (e.g. "– Emma R.").
const banned = /\b(premier|state[- ]of[- ]the[- ]art|world[- ]class|luxury|seamless|cutting[- ]edge|unrivalled|unrivaled|industry[- ]leading|top[- ]notch|24\/7|surveillance|cctv|alarmed|monitored security|advanced security)\b/i;
const fakeQuote = /[“"][^”"]{10,}[”"]\s*[-–—]\s*[A-Z][a-z]+ [A-Z]\./;

const decode = (html) => html
  .replace(/<[^>]*>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&nbsp;/g, ' ')
  .replace(/&quot;/g, '"')
  .trim();

const excerptOf = (content) => {
  const first = decode(content.match(/<p[^>]*>([\s\S]*?)<\/p>/)[1]);
  return first.length > 200 ? `${first.slice(0, 197).replace(/\s+\S*$/, '')}…` : first;
};

const missing = posts.filter((post) => !blogContent[post.slug]).map((post) => post.slug);
if (missing.length) throw new Error(`Missing curated copy for: ${missing.join(', ')}`);

const problems = [];
const updated = posts.map((post) => {
  const content = blogContent[post.slug].content.trim();
  if (content.length <= 1000) problems.push(`Too short: ${post.slug} (${content.length} chars)`);
  const bannedHit = content.match(banned);
  if (bannedHit) problems.push(`Banned claim "${bannedHit[0]}" in ${post.slug}`);
  if (fakeQuote.test(content)) problems.push(`Possible invented testimonial in ${post.slug}`);
  return { ...post, title: blogContent[post.slug].title, content, excerpt: excerptOf(content) };
});

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

fs.writeFileSync('src/data/blogPosts.json', `${JSON.stringify(updated, null, 2)}\n`);
console.log(`Applied curated copy to ${updated.length} articles.`);
