# 06 — Conversion Plan

## The core problem

The site gets few leads because it gives the visitor nothing to trust and no
easy next step. Every competitor publishes at least one of: a review count, a
warranty, a price band, or a process. This site publishes none.

## Action by intent

| Visitor intent | Primary action | Must appear above the fold |
|---|---|---|
| Urgent (repair, not working) | **Call 0800 301 005** | Phone, tap-to-call, same-day if possible |
| Local service (installation) | Get a free quote | Location, price band, warranty |
| Subsidy seeker (Warmer Kiwi) | Check eligibility | Grant amount, high-wall only |
| Commercial investigation (cost) | Read, then soft quote CTA | Price bands, no hard sell |
| Navigational (brand) | Contact details | Phone, address, hours |

## The five trust elements to add

Ranked by conversion impact for this market:

1. **Google reviews on the page.** A live rating and count, not a static claim.
   Competitors show 468, 193, 121. Even 15 real reviews beats none.
2. **A named workmanship warranty.** Concrete and checkable. Three competitors
   do this.
3. **An indicative price band.** Removes the biggest friction. One competitor
   publishes $2,500 to $4,500 fully installed.
4. **The install process with timescales.** Answers what happens next. Aeon:
   install within 2 weeks of quote, about 4 hours on the day.
5. **Brand and licence credentials.** Authorised Daikin Specialist Dealer,
   Master Electricians, if genuinely held.

## Form design

- Fields: name, phone, email, suburb, brief description. Nothing else.
- Phone field uses type=tel, email uses type=email.
- No required field the business will not use.
- Honeypot before CAPTCHA.
- Confirmation states a realistic response time, and only one the owner commits to.

## Per-page CTA

| Page | Primary | Secondary |
|---|---|---|
| Homepage | Get a free quote | Call |
| Installation | Get a free quote | Call |
| Repair | **Call** | Request a callback |
| Servicing | Book a service | Call |
| Warmer Kiwi Homes | Check eligibility | Call |
| Cost article | Get a quote | Read the FAQ |
| Location pages | Get a free quote | Call |
| About | Get a free quote | Call |

## Measurement (set up before launch)

- [ ] Call clicks (tel: events)
- [ ] Form starts vs completions
- [ ] Email clicks
- [ ] GBP direction requests
- [ ] Enquiry source attribution

> **Rule:** publish no response-time promise the owner has not confirmed.
