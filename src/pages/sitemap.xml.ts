import type { APIContext } from "astro";
import { pages } from "../data/sitePages.ts";
import { posts, archives } from "../data/blog.ts";
import { locationSlugs } from "../data/locationPages.ts";
export const prerender = true;
export function GET(...args: Pick<APIContext, "site">[]): Response {
  const { site } = args[0] ?? ({} as Pick<APIContext, "site">);
  const origin = site?.origin ?? "https://westaucklandstorage.co.nz";
  // Publication dates are not modification dates. Omit lastmod until editorial
  // modification dates are maintained; rebuilding must not claim fresh content.
  const urls = [...new Set(["/", "/sitemap/", "/pay-your-account/", ...pages.map((page) => `/${page.slug}/`), ...posts.map(post => `/${post.slug}/`), ...archives.map(archive => `/${archive.slug}/`), ...locationSlugs])];
  const body = urls
    .map((path: string) => ` <url><loc>${origin}${path}</loc></url>`)
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
