# Brand quick reference

Use [the full brand guide](brandvoice-visual-identity.md) for business facts and [the saved design](../references/design/West-Auckland-Storage.html) for appearance. This sheet records the brief review on 17 September 2026, not a new confirmation of operating conditions.

## Visual system

| Role | Value |
| --- | --- |
| Marine blue | `#145693` |
| Dark blue | `#082E54` |
| Bright accent | `#128BFB` |
| Sky accent | `#A5D2FD` |
| Main text | `#12283D` |
| Muted text | `#587086` |
| Paper / white | `#F5F8FA` / `#FFFFFF` |
| Dividers | `#D3E1EB` |

Use Barlow Condensed for uppercase headings and DM Sans for body text. Reference headings use weight 700 and letter spacing `-.035em`; body text is 16px with line height 1.6. The wordmark is condensed, upright and tightly set. Check contrast for each text/background pairing; bright blue is not automatically suitable for small white text.

The reference has a full-width yard-photo hero, dark blue overlay, large left-aligned heading, transparent desktop navigation and outlined call button. White and pale-grey sections alternate with blue sections. Photography, square cards, thin dividers and generous spacing give the page its structure. Use real approved yard photographs. Keep the hero overlay for readability; avoid decorative gradients or extra palette colours.

Reference dimensions are an 1180px content maximum, 24px desktop side gutters and 112px section padding. At 680px and below, use 18px gutters, a 540px content maximum and 78px section padding. Desktop grids become stacked mobile sections. Shared tokens should retain these values. Provide visible focus, reduced-motion support, targets of at least 44px and a sticky mobile call CTA.

## Voice dos and don'ts

1. Write as the local yard speaking to its customers. Use "your boat", "our yard" and "ask about space".
2. Lead with what the customer needs to store, then location, price and the easy next step.
3. Use short, active sentences and paragraphs of two to four sentences.
4. State confirmed facilities plainly. Avoid "world-class", "premier", "solutions" and exaggerated security claims.
5. Quote "from $200 + GST per month". Do not omit GST or promise category-specific prices without confirmation.
6. Say "24/7 by prior arrangement". Never imply unrestricted access or invent office hours.
7. Keep existing conditional slipway wording. Do not turn it into a promise that the slipway is operating.
8. Use "Company established in 2008" or the approved lifetime figure "15,000+ boats stored over our history". Do not invent a current boat count or imply continuous operations since incorporation.
9. Keep CTAs direct and low-pressure, with separate call and enquiry options. Confirmation must describe what actually happened.
10. Give each storage page useful category details. Reserve numbered badges for real sequences and limit each headline to one accent unless there is a clear reason for another.

## Facts and conversion copy

Use the business name **West Auckland Storage**, phone **09 818 4586**, address **20 Akatea Road, Glendene, Auckland 0602** and email **info@westaucklandstorage.co.nz** consistently. The yard is Span Farm Boat Yard Ltd; Jeff is the on-site manager. The call link is `tel:098184586`.

Storage is monthly, from $200 + GST, with no deposit required and no waitlist. The yard stores boats on trailers up to 40ft, caravans, trailers, cars, 4WDs, utes, trucks, shipping containers, jet skis, kayaks, business equipment and 20ft or 40ft shipping containers. Ask the yard for container pricing. Do not offer household storage.

CCTV, a gated yard and an on-site manager are confirmed. Daylight access is best; after-hours access uses a gate code, with 24/7 access by prior arrangement. Boat work requires the site manager's pre-approval. Toilets and a wash-down hose are available.

Jeff monitors enquiries with a stated 24-hour response time. A quote needs the item's length including its trailer and the start date, not width. Segment the form by storage type and preserve that choice from storage pages. The shared form already submits through `/api/contact`; see [delivery configuration](contact-form.md). Show success only when the provider accepts the request, retain entries after failure and offer the phone number.

## Brief limits

The supplied outline names §3, §6.3 and §6.6 without their detailed specifications. Use the saved reference and full brand guide for decisions those sections leave open. Current facts and the user's accessibility and badge rules take precedence over historical reference copy and controls. Do not date-stamp an operational claim as newly verified merely because the page was edited. Keep reference files outside `public/`.
