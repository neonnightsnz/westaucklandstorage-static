// Checks on the curated -> shipped transform behind `npm run build:blog`.
//
// The build rewrites src/data/blogPosts.json from src/data/curated-blog.mjs.
// These tests pin the behaviour that transform is responsible for: shared copy
// expansion, the excerpt fallback, and the brand-voice guards that block banned
// claims from reaching the site.
import { describe, expect, it } from 'vitest';
import { blogContent } from '../src/data/curated-blog.mjs';
import { contactCta, expandShared, slipwayLine, yardAddressHtml } from '../src/data/shared-blog-content.mjs';
import posts from '../src/data/blogPosts.json' with { type: 'json' };

describe('shared copy expansion', () => {
  it('substitutes the shared address and contact line', () => {
    expect(expandShared('We are at Span Farm Boat Yard, {{yard}} today.')).toBe(`We are at Span Farm Boat Yard, ${yardAddressHtml} today.`);
    expect(expandShared('{{cta}} to check space.')).toBe(`${contactCta} to check space.`);
    expect(expandShared('We are at {{yardShort}}.')).toBe(`We are at ${yardAddressHtml}.`);
  });

  it('never leaves a placeholder or invents doubled wording', () => {
    const expanded = expandShared('Call {{cta}} with the details.');
    expect(expanded).not.toMatch(/\{\{|\}\}/);
    expect(expanded).not.toMatch(/Call Call|on Call|Call on/);
  });

  it('keeps the shared copy in the shipped articles', () => {
    for (const post of posts) {
      expect(post.content, `${post.slug} lost the shared yard address`).toContain(yardAddressHtml);
      expect(post.content, `${post.slug} lost the shared contact line`).toContain(contactCta);
      expect(post.content, `${post.slug} lost the shared slipway notice`).toContain(slipwayLine.replace(/<[^>]*>/g, ''));
    }
  });
});

describe('curated copy', () => {
  it('covers every shipped article and nothing else', () => {
    const curatedSlugs = Object.keys(blogContent);
    const shippedSlugs = posts.map((post) => post.slug);
    expect([...curatedSlugs].sort()).toEqual([...shippedSlugs].sort());
    expect(new Set(curatedSlugs).size).toBe(curatedSlugs.length);
  });

  it('gives every article a title and body', () => {
    for (const [slug, article] of Object.entries(blogContent)) {
      expect(article.title, `${slug} needs a title`).toBeTruthy();
      expect(article.content.trim().length, `${slug} needs a body`).toBeGreaterThan(1000);
    }
  });

  it('titles the shipped articles from the curated copy', () => {
    for (const post of posts) {
      expect(post.title, `${post.slug} title is not the curated title`).toBe(blogContent[post.slug].title);
    }
  });

  it('keeps banned brand claims out of the shipped copy', () => {
    const banned = /\b(premier|state[- ]of[- ]the[- ]art|world[- ]class|luxury|seamless|cutting[- ]edge|unrivalled|unrivaled|industry[- ]leading|top[- ]notch|surveillance|cctv|alarmed|monitored security|advanced security)\b/i;
    for (const post of posts) {
      expect(post.content, `${post.slug} carries a banned claim`).not.toMatch(banned);
    }
  });

  it('only claims after-hours access with the required qualifier', () => {
    for (const post of posts) {
      const claim = post.content.match(/(?:24\/7|around[- ]the[- ]clock)/i);
      if (claim) {
        expect(post.content, `${post.slug} claims unqualified access`).toMatch(/24\/7 access by prior arrangement/);
      }
    }
  });
});
