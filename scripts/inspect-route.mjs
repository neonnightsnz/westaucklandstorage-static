/**
 * Spot-check the head metadata of one or more built routes.
 *
 * Usage:
 *   node scripts/inspect-route.mjs /why-choose-west-auckland-storage/ /boat-storage-at-west-auckland-storage/
 *   node scripts/inspect-route.mjs --all            # every built route
 *   node scripts/inspect-route.mjs --warn           # only routes with warnings
 *
 * Reads docs/seo-audit.json, which scripts/audit-seo.mjs writes. Run
 * the reusable SEO audit tooling first (after `npm run build`) to refresh it.
 * Exits non-zero when a checked route has a warning, so it can gate a build.
 */
import fs from 'node:fs';

const AUDIT_FILE = 'docs/seo-audit.json';
const TITLE_MAX = 60;
const TITLE_MIN = 30;
const DESC_MAX = 160;
const DESC_MIN = 70;

// Reserved titles that legitimately carry no indexable metadata.
const EXEMPT = new Set(['/design-system/', '/services/contact/']);

if (!fs.existsSync(AUDIT_FILE)) {
  console.error(`No ${AUDIT_FILE}. Run the reusable SEO audit tooling after the build.`);
  process.exit(2);
}

const report = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
const pages = report.current;

const normalise = (route) => (route.startsWith('/') ? route : `/${route}`);
const withTrailingSlash = (route) => (route.endsWith('/') ? route : `${route}/`);

function warningsFor(page) {
  const warnings = [];
  const searchable = !EXEMPT.has(page.route);
  if (searchable && !page.title) warnings.push('missing <title>');
  if (page.title.length > TITLE_MAX) warnings.push(`title ${page.title.length} chars (over ${TITLE_MAX})`);
  if (searchable && page.title && page.title.length < TITLE_MIN) warnings.push(`title ${page.title.length} chars (under ${TITLE_MIN})`);
  if (searchable && !page.description) warnings.push('missing description');
  if (page.description && page.description.length > DESC_MAX) warnings.push(`description ${page.description.length} chars (over ${DESC_MAX})`);
  if (searchable && page.description && page.description.length < DESC_MIN) warnings.push(`description ${page.description.length} chars (under ${DESC_MIN})`);
  if (searchable && !page.canonical) warnings.push('missing canonical');
  if (searchable && !page.schemaTypes.length) warnings.push('no structured data');
  if (page.internalLinks.length === 0) warnings.push('no internal links');
  return warnings;
}

function printPage(page) {
  const warnings = warningsFor(page);
  console.log(`${page.route}${warnings.length ? '  ⚠' : ''}`);
  console.log(`  title       ${page.title.length} chars  ${JSON.stringify(page.title)}`);
  console.log(`  description ${page.description.length} chars  ${JSON.stringify(page.description)}`);
  console.log(`  canonical   ${page.canonical || '(none)'}`);
  console.log(`  schema      ${page.schemaTypes.length ? page.schemaTypes.join(', ') : '(none)'}`);
  console.log(`  links       ${page.internalLinks.length} internal`);
  if (warnings.length) console.log(`  warnings    ${warnings.join('; ')}`);
  console.log('');
  return warnings.length;
}

const args = process.argv.slice(2);
let selected;

if (args.includes('--all') || args.length === 0) {
  selected = pages;
} else if (args.includes('--warn')) {
  selected = pages.filter((page) => warningsFor(page).length > 0);
} else {
  const wanted = args.filter((arg) => !arg.startsWith('--')).map((arg) => withTrailingSlash(normalise(arg)));
  const missing = wanted.filter((route) => !pages.some((page) => page.route === route));
  selected = pages.filter((page) => wanted.includes(page.route));
  if (missing.length) {
    console.error(`Not in the build (refresh the SEO audit if it is new): ${missing.join(', ')}`);
    process.exit(2);
  }
}

if (!selected.length) {
  console.log('No routes matched.');
  process.exit(0);
}

let warned = 0;
for (const page of selected) warned += printPage(page);

const label = args.includes('--all') || args.length === 0 ? 'all routes' : 'selected routes';
console.log(`${selected.length} route(s) checked (${label}), ${warned} with warnings.`);
process.exit(warned ? 1 : 0);
