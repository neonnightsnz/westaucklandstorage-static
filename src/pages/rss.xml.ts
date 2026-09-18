import type { APIContext } from "astro";
import { posts } from "../data/blog.ts";
export const prerender = true;
export function GET(...args: Pick<APIContext, "site">[]): Response {
  const { site } = args[0] ?? ({} as Pick<APIContext, "site">);
  const origin = site?.origin ?? "https://westaucklandstorage.co.nz";
  const sorted = [...posts].sort(
    (a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const items = sorted
    .map(
      (post: { title: string; slug: string; date: string; excerpt: string }) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${origin}/${post.slug}/</link>
      <guid isPermaLink="true">${origin}/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>West Auckland Storage — From the yard</title>
    <link>${origin}/blog/</link>
    <description>Storage advice and local guides for West Auckland boat, caravan and vehicle owners.</description>
    <language>en-nz</language>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
