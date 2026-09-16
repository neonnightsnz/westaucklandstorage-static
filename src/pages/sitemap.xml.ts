import { pages } from "../data/sitePages";

export const prerender = true;

export function GET({ site }) {
  const origin = site?.origin ?? "https://westaucklandstorage.co.nz";
  const urls = ["/", ...pages.map((page) => `/${page.slug}/`)];
  const body = urls
    .map((path) => `  <url><loc>${origin}${path}</loc></url>`)
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}