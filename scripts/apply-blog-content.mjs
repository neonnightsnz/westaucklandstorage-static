// Rebuild src/data/blogPosts.json from the curated, brand-aligned copy in
// src/data/curated-blog.mjs, preserving each article's slug, date and image.
// Run with: npm run build:blog
import fs from 'node:fs';
import { blogContent } from '../src/data/curated-blog.mjs';
import { contactCta, expandShared, slipwayLine, yardAddressHtml } from '../src/data/shared-blog-content.mjs';

const posts = JSON.parse(fs.readFileSync(process.env.BLOG_SOURCE ?? 'src/data/blogPosts.json', 'utf8'));

// The address and CTA live once in src/data/shared-blog-content.mjs and reach
// each article through the {{yard}} / {{cta}} placeholders curated-blog.mjs uses.
const placeholders = /\{\{(?:yard|yardShort|cta)\}\}/g;

// Claims the brand guide bans outright, plus the fabricated-testimonial pattern
// the original WordPress copy used (e.g. "– Emma R.").
// "24/7" is deliberately absent: it is allowed only in the exact phrase
// "24/7 access by prior arrangement", which the unplanned-access pattern
// below still rejects. Any other use of the term is caught by that pattern.
const banned = /\b(premier|state[- ]of[- ]the[- ]art|world[- ]class|luxury|seamless|cutting[- ]edge|unrivalled|unrivaled|industry[- ]leading|top[- ]notch|surveillance|cctv|alarmed|monitored security|advanced security)\b/i;
// "24/7" or "around the clock" without the "by prior arrangement" qualifier.
const unplannedAccess = /(?:24\/7|around[- ]the[- ]clock)(?!\s*(?:access\s*)?by prior arrangement)/i;
const fakeQuote = /[“"][^”"]{10,}[”"]\s*[-–—]\s*[A-Z][a-z]+ [A-Z]\./;

const decode = (html) => html
  .replace(/<[^>]*>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&nbsp;/g, ' ')
  .replace(/&quot;/g, '"')
  .trim();

/** Meta description: a leftover <meta name="description"> body, else the opening paragraph. */
const excerptOf = (content, metaDescription) => {
  const source = typeof metaDescription === 'string' && metaDescription.trim() ? ` ${metaDescription.trim()} ` : content;
  const first = decode(source.match(/<p[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? source);
  return first.length > 160 ? `${first.slice(0, 157).replace(/\s+\S*$/, '')}…` : first;
};

const missing = posts.filter((post) => !blogContent[post.slug]).map((post) => post.slug);
if (missing.length) throw new Error(`Missing curated copy for: ${missing.join(', ')}`);

const problems = [];
const unknownSlugs = [...new Set(
  Object.keys(blogContent)
    .flatMap((slug) => [...blogContent[slug].content.matchAll(/\(\(([^)]+)\)\)/g)].map(([, body]) => `${slug} -> ${body}`)),
)];
if (unknownSlugs.length) problems.push(`Unresolved curated placeholders:\n  ${unknownSlugs.join('\n  ')}`);

const sharedSlipwaySentence = slipwayLine.replace(/<[^>]*>/g, '').trim();
// Posts whose contact details are not the phrasal verb "Call": those wrap {{cta}}
// in their own wording (e.g. "Give us a call on ..."), which stays editorial.
const callPhrase = new RegExp(`Call\\s+${contactCta.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);

const updated = posts.map((post) => {
  const curated = blogContent[post.slug];
  const content = expandShared(curated.content).trim();
  const leftover = content.match(placeholders);
  if (leftover) problems.push(`Unexpanded placeholder "${leftover[0]}" in ${post.slug}`);
  if (!content.includes(contactCta)) problems.push(`Missing shared contact details: ${post.slug}`);
  if (content.includes(`Call ${contactCta}`) && !callPhrase.test(content)) {
    problems.push(`Malformed shared contact line: ${post.slug}`);
  }
  // The shared yard copy must not drift when an article is edited: a rebuild that
  // drops a shared paragraph is a regression, not an editorial choice.
  for (const sentence of [`Span Farm Boat Yard, ${yardAddressHtml}`, sharedSlipwaySentence, `are already storing with us`]) {
    if (post.content.includes(sentence) && !content.includes(sentence)) {
      problems.push(`Shared yard copy dropped from ${post.slug}: ${sentence}`);
    }
  }
  if (content.length <= 1000) problems.push(`Too short: ${post.slug} (${content.length} chars)`);
  const bannedHit = content.match(banned);
  if (bannedHit) problems.push(`Banned claim "${bannedHit[0]}" in ${post.slug}`);
  const accessHit = content.match(unplannedAccess);
  if (accessHit) problems.push(`Unqualified access claim "${accessHit[0]}" in ${post.slug}`);
  if (fakeQuote.test(content)) problems.push(`Possible invented testimonial in ${post.slug}`);
  const excerptSource = typeof curated.description === 'string' ? expandShared(curated.description) : curated.description;
  // dateLabel is intentionally not carried over: templates derive the readable
  // date from `date` with formatPostDate() so the two cannot disagree.
  const { dateLabel: _dropped, ...withoutLabel } = post;
  return { ...withoutLabel, title: curated.title, content, excerpt: excerptOf(content, excerptSource) };
});

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}

fs.writeFileSync(
  `src/data/${process.env.BLOG_OUT ?? 'blogPosts.json'}`,
  `${JSON.stringify(updated, null, 2)}\n`,
);
console.log(`Applied curated copy to ${updated.length} articles.`);
