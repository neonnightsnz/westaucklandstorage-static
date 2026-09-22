// Single source of truth for the copy that every blog article reuses:
// the yard details, the slipway status line and the closing call to action.
//
// Edit these once here rather than in each of the 34 articles in
// src/data/curated-blog.mjs. `npm run build:blog` rewrites blogPosts.json
// from curated-blog.mjs, so the shared copy must not be inlined there.

/** Repeated verbatim across articles and asserted by scripts/check-site.mjs. */
export const contactCta = 'Call 09 818 4586 or email info@westaucklandstorage.co.nz';

/** The only address form the article build will write into blog copy. */
export const yardAddressHtml = '20 Akatea Road, Glendene';

const cta = contactCta;

/**
 * Replaces the address / CTA placeholders in one curated article body.
 * {{yard}} renders as the full address and {{yardShort}} is the same address for
 * sentences that already name the yard; {{cta}} is the shared contact line.
 * Articles are written around the placeholder so no other wording — and no
 * double-up like "Call Call 09 818 4586" — has to change when the yard's details do.
 */
export const expandShared = (content) => content
  .replaceAll('{{yardShort}}', yardAddressHtml)
  .replaceAll('{{yard}}', yardAddressHtml)
  .replaceAll('{{cta}}', contactCta)
  .replaceAll(`at Span Farm Boat Yard in ${yardAddressHtml}`, `at Span Farm Boat Yard in Glendene`)
  .replaceAll(`Call ${contactCta}`, contactCta)
  .replaceAll(`on ${contactCta}`, contactCta);

export default { contactCta, cta };

export const slipwayLine = `<p>The slipway is a genuine part of Span Farm Boat Yard's story — but it's currently under repair, and haul-out is still a work in progress. Give us a call before you plan a launch or haul-out.</p>`;

/**
 * Item list shared by the "what we store" paragraphs of the storage-option
 * articles. Each article keeps its own lead-in sentence.
 */
export const storedItemsShort = 'trailers, cars, 4WDs, utes, shipping containers, kayaks and other recreational gear';

/**
 * The relationship between an article's <h2> heading and its body: the heading
 * must be immediately followed by the paragraph it introduces, so a stub
 * heading cannot ship on its own.
 */
export const headingFollowedByBody = (content) => [...content.matchAll(/<h2>[^<]*<\/h2>(\s*<p[^>]*>[\s\S]*?<\/p>)?/g)]
  .every(([block]) => /<p[^>]*>/.test(block));

/** Closing CTA paragraphs, keyed so a reusable one keeps articles at full length. */
export const ctaClosings = {
  laingholm: `<p>Storage is flexible — short stays, winter storage or longer-term arrangements, invoiced monthly. ${cta} and we will come back with the next step.</p>`,
  huia: `<p>Short-term, seasonal and long-term storage are all available and invoiced monthly. ${cta} to check space and pricing.</p>`,
  sunnyvale: `<p>Give us a call on 09 818 4586 or email info@westaucklandstorage.co.nz with a few details and we will get back to you with the options.</p>`,
  newLynn: `<p>We offer short and longer-term storage with monthly invoicing. ${cta} to talk through what you need.</p>`,
  massey: `<p>Short-term, seasonal and long-term options are available. ${cta} with the details and we will come back to you.</p>`,
  westHarbour: `<p>Flexible short and long-term storage, invoiced monthly. ${cta} and we will help you find a spot.</p>`,
  hobsonville: `<p>Short stays, winter storage and longer-term arrangements are all welcome, invoiced monthly. ${cta} and we will talk it through.</p>`,
  lincoln: `<p>Flexible short and long-term storage, invoiced monthly. ${cta} with a few details and we will get back to you.</p>`,
  greenBay: `<p>Short and longer-term storage, invoiced monthly from $200 + GST, with no deposit required. ${cta} and we will find the right spot for you.</p>`,
  kelston: `<p>Short-term, seasonal and long-term storage are all available and invoiced monthly. ${cta} to check space.</p>`,
  swanson: `<p>Flexible short and long-term storage with monthly invoicing. ${cta} and we will work out the details.</p>`,
  whenuapai: `<p>Short-term, seasonal and long-term options, invoiced monthly. ${cta} with the details and we will get back to you.</p>`,
  glendene: `<p>Flexible short and long-term storage, invoiced monthly. ${cta} and we will find you a spot.</p>`,
  teAtatuPeninsula: `<p>Flexible short and long-term storage, invoiced monthly. ${cta} to check availability.</p>`,
  // Deliberately the original generic closing, reused as-is so the South/Titirangi
  // articles keep their licensed %%AND%% paragraph and stay above the length floor.
  genericDetailed: `<p>Flexible short and long-term options, invoiced monthly. ${cta}, plus open <a href="/gate-hours/">gate hours</a> and a <a href="/site-rules/">site orientation</a>.</p>`,
};
