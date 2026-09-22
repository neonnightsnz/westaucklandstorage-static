import { posts, archives, categoryFor, categoryLabel } from './blog';
import { storageOptions } from './sitePages';
import { locationGroups } from './locations';
import { guidedSuburbs } from './locations';
import { locationPages } from './locationPages';

export const siteUrl = 'https://westaucklandstorage.co.nz';
export const absoluteUrl = (pathname: string) => new URL(pathname, siteUrl).href;
export type Breadcrumb = { name: string; path: string };

const marketing: Record<string, { title: string; description: string }> = {
  '/': { title: 'Boat, Caravan & Vehicle Storage | West Auckland Storage', description: 'Outdoor boat, caravan and vehicle storage at Span Farm Boat Yard in Glendene, West Auckland. Ask about space, flexible terms and current slipway access.' },
  '/about/': { title: 'About Span Farm Boat Yard | West Auckland Storage', description: 'Meet West Auckland Storage at Span Farm Boat Yard, 20 Akatea Road, Glendene. Practical outdoor storage for boats, caravans, trailers and vehicles.' },
  '/services/': { title: 'Boat, Caravan & Vehicle Storage Options | West Auckland Storage', description: 'Explore outdoor storage for boats, caravans, trailers, cars, trucks and business equipment in Glendene. Contact the yard for availability and a quote.' },
  '/contact/': { title: 'Contact & Storage Quotes | West Auckland Storage', description: 'Call 09 818 4586 or enquire about boat, caravan and vehicle storage at 20 Akatea Road, Glendene. Tell us your item size and preferred dates.' },
  '/storage-near-you/': { title: 'Storage near West Auckland Suburbs | West Auckland Storage', description: 'Find local guides for boat, caravan and vehicle storage near West Auckland suburbs. Our outdoor storage yard is at 20 Akatea Road in Glendene.' },
};

export function breadcrumbsFor(pathname: string): Breadcrumb[] {
  if (pathname === '/' || pathname === '/404.html') return [];
  const home = { name: 'Home', path: '/' };
  const post = posts.find(post => pathname === `/${post.slug}/`);
  if (post) {
    const category = categoryFor(post.slug);
    return [home, { name: 'From the yard', path: '/blog/' }, { name: categoryLabel(category), path: `/category/${category}/` }, { name: post.title, path: pathname }];
  }
  const archive = archives.find(archive => pathname === `/${archive.slug}/`);
  if (archive) {
    const items = [home];
    if (archive.base !== 'blog') items.push({ name: 'From the yard', path: '/blog/' });
    items.push({ name: archive.label, path: `/${archive.base}/` });
    if (archive.number > 1) items.push({ name: `Page ${archive.number}`, path: pathname });
    return items;
  }
  const nearPage = locationPages.find(page => pathname === page.slug);
  if (nearPage) return [home, { name: 'Storage near you', path: '/storage-near-you/' }, { name: nearPage.suburb, path: pathname }];
  const labels: Record<string, string> = { '/about/': 'About the yard', '/services/': 'What we store', '/contact/': 'Get in touch', '/storage-near-you/': 'Storage near you', '/sitemap/': 'Sitemap' };
  return labels[pathname] ? [home, { name: labels[pathname], path: pathname }] : [];
}

export function metadataFor(pathname: string, fallback: { title: string; description: string }) {
  if (marketing[pathname]) return marketing[pathname];
  // Only the 404 page may set its own copy; every other route resolves here
  // first, so a page's hero lede or content paragraph cannot leak out as the
  // search result snippet.
  if (pathname === '/404.html') return fallback;
  const post = posts.find(post => pathname === `/${post.slug}/`);
  if (post) {
    const suburb = guidedSuburbs.find(suburb => suburb.slug === post.slug);
    const service = storageOptions.find(option => option.slug === post.slug);
    const description = suburb
      ? `Boat, caravan and vehicle storage for ${suburb.name} owners at our Glendene yard. Explore outdoor storage options and ask about space and access.`
      : service?.description ?? post.excerpt;
    // Article titles carry no brand suffix: the URL and the copy already say
    // where this is, and 27 extra characters push curated suburb titles past
    // the point where Google truncates them.
    return { title: post.title, description };
  }
  const archive = archives.find(archive => pathname === `/${archive.slug}/`);
  if (archive) return { title: `${archive.label}${archive.number > 1 ? ` — Page ${archive.number}` : ''} | West Auckland Storage`, description: `${archive.description}${archive.number > 1 ? ` Page ${archive.number} of ${archive.pageCount}.` : ''}` };
  const nearPage = locationPages.find(page => pathname === page.slug);
  if (nearPage) return { title: `${nearPage.title} | West Auckland Storage`, description: nearPage.description };
  return fallback;
}

// Stable entity IDs retain the original Rank Math identity, with current facts.
export function structuredDataFor(pathname: string, title: string, description: string, image: string) {
  const canonical = absoluteUrl(pathname);
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const post = posts.find(post => pathname === `/${post.slug}/`);
  const archive = archives.find(archive => pathname === `/${archive.slug}/`);
  const breadcrumbs = breadcrumbsFor(pathname);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'SelfStorage', '@id': organizationId,
      name: 'West Auckland Storage', url: `${siteUrl}/`,
      description: 'Outdoor hardstand storage for boats, caravans, trailers and vehicles at Span Farm Boat Yard in Glendene, West Auckland.',
      telephone: '+6498184586', email: 'info@westaucklandstorage.co.nz',
      image: absoluteUrl('/images/boat-hardstand.jpg'), logo: absoluteUrl('/images/logo.png'),
      address: { '@type': 'PostalAddress', streetAddress: '20 Akatea Road, Glendene', addressLocality: 'Waitakere', addressRegion: 'Auckland', postalCode: '0602', addressCountry: 'NZ' },
      geo: { '@type': 'GeoCoordinates', latitude: -36.890488, longitude: 174.662988 },
      hasMap: 'https://maps.app.goo.gl/a359LycS4y4m8mbS9',
      areaServed: locationGroups.flatMap(group => group.suburbs.map(suburb => suburb.name)),
      priceRange: 'From $200 + GST per month',
      paymentAccepted: 'Cash, Cheque, Credit Card, Bank Transfer',
      currenciesAccepted: 'NZD',
      parentOrganization: { '@type': 'Organization', name: 'Span Farm Boat Yard Ltd' },
    },
    { '@type': 'WebSite', '@id': websiteId, url: `${siteUrl}/`, name: 'West Auckland Storage', publisher: { '@id': organizationId }, inLanguage: 'en-NZ' },
    {
      '@type': pathname === '/about/' ? 'AboutPage' : pathname === '/contact/' ? 'ContactPage' : archive ? 'CollectionPage' : 'WebPage',
      '@id': `${canonical}#webpage`, url: canonical, name: title, description,
      isPartOf: { '@id': websiteId }, about: { '@id': organizationId }, inLanguage: 'en-NZ',
      primaryImageOfPage: { '@type': 'ImageObject', url: image },
      ...(breadcrumbs.length ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
    },
  ];
  if (breadcrumbs.length) graph.push({ '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`, itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path) })) });
  if (post) graph.push({
    '@type': 'BlogPosting', '@id': `${canonical}#article`, url: canonical,
    headline: post.title, description, image: [image], datePublished: post.date,
    author: { '@type': 'Person', '@id': `${siteUrl}/author/isaac/#person`, name: post.author, url: `${siteUrl}/author/isaac/` },
    publisher: { '@id': organizationId }, mainEntityOfPage: { '@id': `${canonical}#webpage` },
    articleSection: categoryLabel(categoryFor(post.slug)), inLanguage: 'en-NZ',
  });
  // Location pages describe this yard serving one suburb, so they carry a Place
  // rather than a second business entity. No branchOf: there is one yard, and
  // claiming a branch would misstate the business in structured data.
  const nearPage = locationPages.find(page => pathname === page.slug);
  if (nearPage) graph.push({
    '@type': 'Place', '@id': `${canonical}#place`, url: canonical,
    name: `Storage near ${nearPage.locality}`, description,
    address: { '@type': 'PostalAddress', streetAddress: '20 Akatea Road, Glendene', addressLocality: 'Waitakere', addressRegion: 'Auckland', postalCode: '0602', addressCountry: 'NZ' },
    isPartOf: { '@id': organizationId },
  });
  return { '@context': 'https://schema.org', '@graph': graph };
}
