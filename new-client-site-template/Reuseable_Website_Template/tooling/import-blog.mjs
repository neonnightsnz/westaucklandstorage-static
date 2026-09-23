import fs from 'node:fs';
import path from 'node:path';

// Import the checked-in WordPress mirror, preserving its article order and copy.
// This writes a RAW snapshot to src/data/blogPosts.raw.json for provenance only.
// The site ships the brand-aligned copy in src/data/blogPosts.json, which is
// rebuilt from src/data/curated-blog.mjs with `npm run build:blog`.
const projectRoot = path.resolve(process.env.PROJECT_ROOT ?? process.cwd());
const root = path.resolve(process.env.WORDPRESS_MIRROR_ROOT ?? path.join(projectRoot, 'references/wordpress')); 
const plain = (html) => html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).trim();
const slugs = [];
for (let page = 1; page <= 4; page++) {
  const html = fs.readFileSync(`${root}/blog/${page === 1 ? '' : `page/${page}/`}index.html`, 'utf8');
  for (const match of html.matchAll(/<h2 class="entry-title[^>]*>\s*<a href="([^"]+)"[^>]*>/g)) {
    const slug = match[1].split('/').filter(part => part && part !== '..' && part !== 'index.html').pop();
    if (!slugs.includes(slug)) slugs.push(slug);
  }
}
function localUrl(value, slug) {
  const url = new URL(value, `https://westaucklandstorage.co.nz/${slug}/`);
  if (url.hostname !== 'westaucklandstorage.co.nz' && url.hostname !== 'www.westaucklandstorage.co.nz') return value;
  if (url.pathname.startsWith('/wp-content/uploads/')) {
    const source = path.join(root, decodeURIComponent(url.pathname));
    if (!fs.existsSync(source)) throw new Error(`Missing original asset: ${source}`);
    // HTTrack saved this AVIF with an .html extension; serve the correct MIME type.
    const bytes = fs.readFileSync(source);
    const assetPath = url.pathname.endsWith('.html') && bytes.subarray(4, 12).toString() === 'ftypavif'
      ? url.pathname.replace(/\.html$/, '.avif') : url.pathname;
    const dest = path.join(projectRoot, 'public', decodeURIComponent(assetPath));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(source, dest);
    return assetPath;
  }
  return url.pathname.replace(/index\.html$/, '') + url.search + url.hash;
}
const posts = slugs.map(slug => {
  let html = fs.readFileSync(`${root}/${slug}/index.html`, 'utf8');
  if (slug === 'west-auckland-storage-your-trusted-storage-solution-in-swanson') {
    // Recovered from published post 343 in the supplied WordPress backup.
    const recovered = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/data/recovered-swanson.json'), 'utf8'));
    html = `<h1 class="entry-title">${recovered.title}</h1><span itemprop="datePublished">October 19, 2024</span><div class="entry-content clear">${recovered.content}</div><!-- .entry-content -->`;
  }
  const title = plain(html.match(/<h1 class="entry-title"[^>]*>([\s\S]*?)<\/h1>/)[1]);
  let content = html.match(/<div class="entry-content clear"[^>]*>([\s\S]*?)<\/div><!-- \.entry-content/)[1].trim();
  content = content.replace(/<!--[^]*?-->/g, '').replace(/<script\b[^]*?<\/script>/gi, '').replace(/\s(?:class|style|srcset|sizes|on\w+)=(?:"[^"]*"|'[^']*')/gi, '');
  content = content.replace(/\b(href|src)="([^"]+)"/g, (_, attr, value) => `${attr}="${localUrl(value, slug)}"`);
  content = content.replace(/<(\/?)h[34](\s[^>]*|)>/g, '<$1h2$2>');
  const imageTag = html.match(/<img\b[^>]*class="[^"]*wp-post-image[^>]*>/)?.[0];
  const image = imageTag ? localUrl(imageTag.match(/src="([^"]+)"/)[1], slug) : '/images/boat-trailer.jpg';
  const imageAlt = imageTag ? plain(imageTag.match(/alt="([^"]*)"/)?.[1] ?? '') : '';
  const dateLabel = plain(html.match(/itemprop="datePublished">([^<]+)/)[1]);
  const date = new Date(`${dateLabel} UTC`).toISOString().slice(0, 10);
  // The human-readable label is derived from `date` by src/data/dates.ts, so it is
  // not stored here: that avoids the two drifting apart.
  const excerpt = plain(content.match(/<p[^>]*>([\s\S]*?)<\/p>/)[1]);
  return { slug, title, date, author: 'Isaac', image, imageAlt, excerpt, content };
});
if (posts.length !== 34) throw new Error(`Expected 34 original posts, found ${posts.length}`);
fs.writeFileSync(path.join(projectRoot, 'src/data/blogPosts.raw.json'), JSON.stringify(posts, null, 2) + '\n');
console.log(`Imported ${posts.length} raw articles to src/data/blogPosts.raw.json. Run \`npm run build:blog\` to reapply curated copy.`);
