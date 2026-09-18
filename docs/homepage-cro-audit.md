# Homepage CRO review

## Scope and evidence

This review follows the `cro` skill from https://github.com/coreyhaines31/marketingskills, including its form guidance and experiment reference. The requested `page-cro` command returned no matching skill; the repository lists `cro` instead. Both command outputs were read from temporary files.

The page is a local storage homepage. Its primary conversion is a successfully delivered, qualified storage enquiry. Telephone contact is a secondary path. The user confirmed local organic search and Google Maps as the priority channels. Current conversion rate, lead quality and conversion targets have not been supplied. No product-marketing context file was found; `docs/brandvoice-visual-identity.md` supplies business facts. No analytics implementation was found in the inspected application source, and the roadmap still lists analytics and goal events as unfinished. This does not rule out tracking injected by hosting or another external service.

The review covers positioning, headlines, CTAs, visual hierarchy, trust, objections and form friction. Browser checks from the preceding pass covered the hero at 1440px and 390px, cards, form, navigation, FAQ, carousel and slipway preselection. Recommendations below are hypotheses, not measured conversion improvements.

Existing section order, grids, fields, functional attributes, data structures and scripts remain intact. No review wording, rating or count was changed. No new analytics service or external transmission was added.

## Quick wins implemented

| Issue | Change | Expected benefit | Priority |
| --- | --- | --- | --- |
| The form did not identify all required fields in its visible labels. | Marked name, phone or email, and storage type as required. | Visitors can see the minimum information needed before attempting submission. | Medium |
| Visitors could assume they need exact measurements and a firm date before enquiring. | Explained that length and start date are optional, estimates are acceptable, and Jeff confirms details. | Reduces uncertainty without changing validation or collecting less information from willing visitors. | Medium |
| A genuine featured review mentions DIY haul-out, although current facilities are not available. | Added current slipway and haul-out status to the existing review introduction. Preserved all testimonials verbatim. | Prevents historical social proof from implying present availability. | High |
| The slipway FAQ used a long introduction before answering the question. | Replaced it with the current status and next step. | Makes a material limitation easier to find and understand. | Medium |
| The homepage address used a different locality format from the confirmed business details. | Aligned it to “20 Akatea Road, Glendene, Auckland 0602”. | Keeps the homepage consistent with the confirmed contact details. | Medium |

The previous browser pass also shortened a clipped contact placeholder and added an explicit white background to outlined CTA hover/focus states.

## High-impact changes to prioritise

1. **Establish a conversion baseline.** Confirm whether hosting already injects analytics. Choose an approved measurement service before implementing tracking. Count successful contact delivery only after the endpoint returns `ok: true`; a button click or HTTP 200 alone is not a completed enquiry. Track form starts, submit attempts, delivery failures, and telephone-link clicks separately. A telephone click is intent, not evidence of a completed call. Compare mobile and desktop and break down the actual acquisition channels. Keep names, contact details and message contents out of analytics. Report qualified enquiries alongside conversion rate so a shorter form is not judged solely by submission volume.

2. **Match photographs to the storage category.** The caravan/trailer card currently shows kayaks on a rack, and the vehicles card shows boats. Use approved, current yard photographs showing the advertised categories within the existing image slots. Do not replace them with generic stock or generated depictions of facilities. The relevant image filenames alone do not establish what they show. No substitute caravan or vehicle photograph was verified during this review.

3. **Match messaging to local organic search and Maps.** The hero's service eyebrow is specific, but its main headline, “Free up space. Keep it local.”, could describe many businesses. Prioritise a service-and-location headline test. Keep the existing price, location, security facts and CTA. Do not narrow the whole homepage to boats if caravans and vehicles make up substantial demand. Review available Search Console query and landing-page data to identify the main service searches. Keep the confirmed address, phone and operating limitations consistent across the site and business listing; the live listing has not been audited here. Measure Maps website visits separately where attribution is available, and distinguish website telephone clicks from calls made directly from the listing. No business-listing changes are part of this implementation.

4. **Measure page speed before changing assets.** The roadmap lists responsive images as unfinished. Measure the live mobile page and identify its largest contentful element and image transfer sizes. Then optimise the measured bottleneck while retaining the existing photo slots, crops and dimensions. No Lighthouse score or Core Web Vitals result was collected in this review.

## Form audit and recommended design

Keep the current single-step form and its desktop grid/mobile stack. It has six visible controls plus a hidden spam field. Three visible fields are required. Name and a single phone-or-email field allow a reply; storage type helps route the enquiry. Length, preferred date and message remain optional. The yard needs length including any trailer and a start date to price the space, so the form encourages these without blocking an initial conversation. Do not add a width field.

Retain visible labels, the name autofill attribute, the shared phone-or-email field, the loading status, disabled submit state, and preserved inputs on failure. Do not set an email-only or telephone-only keyboard on a field that accepts both. Retain the 24-hour response expectation and phone alternative. Add no unsupported privacy guarantees, urgency, security badges or “no obligation” claims.

The current error handling distinguishes failed delivery from success and leaves entered details in place. Provider tests use mocks; they do not demonstrate live email delivery. Validate delivery separately in the authorised deployment workflow before relying on conversion figures.

## Test ideas

| Experiment | Hypothesis | Success measure and guardrail |
| --- | --- | --- |
| Current benefit headline versus explicit outdoor-storage headline | New visitors may identify the service more quickly. | Qualified delivered enquiries per homepage visit; monitor mobile wrapping and telephone intent. |
| “Get a storage quote” versus “Check price & availability” | Availability wording may better match visitors who are still assessing options. | Delivered enquiries and lead quality, not CTA clicks alone. Keep the actual response process unchanged. |
| Existing hero proof order versus rating first | Leading with owner evidence may be more useful than years since incorporation. | Qualified enquiries; preserve the dynamic rating, count and incorporation wording. Do not imply operating history from incorporation. |
| Current form helper versus a shorter estimate-friendly version | Less text may reduce perceived effort without losing quote details. | Completion rate and proportion of enquiries with usable length/date information. |

Run one meaningful hypothesis at a time. Establish traffic volume and baseline before choosing sample size or duration. With low traffic, prioritise obvious clarity and usability fixes and collect enquiry feedback rather than claiming significance from small A/B samples. Do not reorder sections, remove navigation, add popups or add fields under the current brief.

## Copy alternatives

| Element | Alternative | Rationale |
| --- | --- | --- |
| Hero | “Outdoor storage. Close to home.” | Names the service while retaining the local benefit. |
| Hero | “Boat & caravan storage. In Glendene.” | Strong match for those categories; less inclusive of vehicle customers. |
| Hero | “Free up your driveway. Store in Glendene.” | Makes both the outcome and location concrete. |
| Main CTA | “Get a storage quote” | Current wording makes the enquiry's purpose clear. |
| Main CTA | “Check price & availability” | Covers the two decisions visitors need help with. |
| Main CTA | “Ask about your space” | Lower-pressure wording, but less explicit about receiving a price. |

These are alternatives for testing, not additional CTAs to display together. Check each headline within the current two-line treatment and mobile width before adopting it.
