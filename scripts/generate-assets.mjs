// Generates brand assets that cannot live as source files elsewhere:
//   public/images/og-default.jpg   1200x630 social sharing card
//   public/images/apple-touch-icon.png  180x180
//   public/images/icon-192.png / icon-512.png  manifest icons
// Run with: npm run build:assets
// The source logo/glyph lives in public/favicon.svg (blue square + white boat).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(publicDir, 'images');

const BRAND = '#145693';
const BRAND_DEEP = '#082e54';
const BRAND_LIGHT = '#a5d2fd';

const ogSource = path.join(imagesDir, 'boat-hardstand.jpg');
const favicon = path.join(publicDir, 'favicon.svg');

const ogSvg = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${BRAND_DEEP}" stop-opacity="0.94"/>
      <stop offset="0.62" stop-color="${BRAND}" stop-opacity="0.82"/>
      <stop offset="1" stop-color="${BRAND}" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#scrim)"/>
  <rect x="0" y="0" width="${w}" height="10" fill="${BRAND_LIGHT}"/>
  <g fill="#ffffff" font-family="Arial, Helvetica, sans-serif">
    <text x="72" y="150" font-size="30" letter-spacing="6" fill-opacity="0.85">SPAN FARM BOAT YARD &#183; GLENDENE</text>
    <text x="72" y="300" font-size="86" font-weight="bold">Keep it close.</text>
    <text x="72" y="396" font-size="86" font-weight="bold" fill="#f4b942">Keep it sorted.</text>
    <text x="72" y="490" font-size="34" fill-opacity="0.92">Boat, caravan &amp; vehicle storage &#8212; West Auckland</text>
    <text x="72" y="566" font-size="28" fill-opacity="0.85">westaucklandstorage.co.nz &#183; 09 818 4586</text>
  </g>
  <g transform="translate(${w - 190} ${h - 200})" fill="none" stroke="#ffffff" stroke-opacity="0.9" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M60 4v66M30 26h60M22 48c9 0 15 5 19 11m63-11c-9 0-15 5-19 11M60 72c-16 0-28-8-36-20m36 20c16 0 28-8 36-20M48 78l12 14 12-14"/>
  </g>
</svg>`;

async function generateOg() {
  const meta = await sharp(ogSource).metadata();
  const target = { width: 1200, height: 630 };

  const base = await sharp(ogSource)
    .resize(target.width, target.height, { fit: 'cover', position: 'attention' })
    .toBuffer();

  const out = await sharp(base)
    .composite([{ input: Buffer.from(ogSvg(target.width, target.height)), top: 0, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(imagesDir, 'og-default.jpg'));

  console.log(`og-default.jpg ${out.width}x${out.height} (from ${meta.width}x${meta.height})`);
}

async function generateIcons() {
  const sizes = [
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
  ];
  for (const [name, size] of sizes) {
    await sharp(favicon, { density: 384 }).resize(size, size).png().toFile(path.join(imagesDir, name));
    console.log(`${name} ${size}x${size}`);
  }
}

await generateOg();
await generateIcons();
console.log('Assets written to public/images/.');
