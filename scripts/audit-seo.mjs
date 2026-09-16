import fs from 'node:fs';
import path from 'node:path';

const origin = 'https://westaucklandstorage.co.nz';
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(([, key, value]) => [key, decode(value)]));
function inventory(root) {
  return fs.readdirSync(root, { recursive: true }).filter(file => file.endsWith('index.html') && !/(?:^|[\\/])(?:wp-content|wp-includes|wp-json|feed|comments)(?:[\\/]|$)/.test(file)).map(file => {
    const route = '/' + file.replaceAll('\\', '/').replace(/index\.html$/, '');
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const tags = [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(([tag]) => attrs(tag));
    const schema = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(([, text]) => {
      try { const value = JSON.parse(text); return value['@graph'] ?? [value]; } catch { return []; }
    });
    const internalLinks = [...new Set([...html.matchAll(/<a\b[^>]*>/gi)].map(([tag]) => attrs(tag).href).filter(Boolean).flatMap(href => {
      try { const url = new URL(href, origin + route); return url.origin === origin ? [url.pathname.replace(/index\.html$/, '')] : []; } catch { return []; }
    }))].sort();
    return { route, title: decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''), description: tags.find(tag => tag.name === 'description')?.content ?? '', canonical: tags.find(tag => tag.rel === 'canonical')?.href ?? '', schemaTypes: [...new Set(schema.flatMap(node => node['@type'] ?? []))], internalLinks };
  }).sort((a, b) => a.route.localeCompare(b.route));
}
const legacy = inventory('references/wordpress');
const current = inventory('dist');
const routes = new Set(current.map(page => page.route));
const redirects = fs.readFileSync('public/_redirects', 'utf8').split(/\r?\n/).filter(line => line && !line.startsWith('#')).map(line => line.trim().split(/\s+/));
const redirectFor = route => redirects.find(([from]) => from === route)?.[1];
const report = {
  legacy: legacy.map(page => ({ ...page, disposition: routes.has(page.route) ? 'preserved' : redirectFor(page.route) ? 'redirected' : 'review', redirect: redirectFor(page.route) })),
  current,
};
fs.writeFileSync('docs/seo-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ legacyPages: legacy.length, currentPages: current.length, missingRoutes: report.legacy.filter(page => page.disposition === 'review').map(page => page.route), legacySchemaTypes: [...new Set(legacy.flatMap(page => page.schemaTypes))] }, null, 2));
