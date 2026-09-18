# Homepage polish: complete updated code

Complete current sources, including the CRO changes for local organic search and Google Maps and the frontend-design refinement. See [the CRO audit](homepage-cro-audit.md) and [the design review](frontend-design-review.md). Section order, grids, functional attributes, data structures and scripts are preserved. No dependencies added.

Verification: homepage and saved reference compared at 1440px and 390px. No horizontal page overflow or captured console errors. Desktop cards and outlined CTA focus contrast checked. Previous checks covered the form, mobile menu, FAQ, carousel and slipway preselection. No enquiry was submitted. Build and site checks passed; contact provider tests used mocks.

## src/pages/index.astro

```astro
---
import PageLayout from "../layouts/PageLayout.astro";
import QuoteForm from "../components/QuoteForm.astro";
import { reviewCount, averageRating } from "../data/reviews";
import ReviewSlider from "../components/ReviewSlider.astro";
import { yearsSinceIncorporation } from "../data/company";

const services = [
  {
    number: "01",
    href: "/boat-storage-at-west-auckland-storage/",
    title: "Boat storage",
    copy: "Free up your driveway and keep your boat close to home. Outdoor storage for boats on trailers up to 40ft, plus jet skis.",
    image: "/images/boat-hardstand.jpg",
  },
  {
    number: "02",
    href: "/caravan-storage-at-west-auckland-storage/",
    title: "Caravan & trailer storage",
    copy: "Make room at home between trips. Store your caravan or trailer for a season or longer, with flexible terms and monthly billing.",
    image: "/images/trailer-storage.jpg",
  },
  {
    number: "03",
    href: "/vehicle-storage-at-west-auckland-storage/",
    title: "Vehicles & gear",
    copy: "Need room for a car, 4WD, ute, truck or kayak? Tell us what you want to store and we'll check the space you need.",
    image: "/images/boats-yard.jpg",
  },
];

const pillars = [
  {
    number: "01",
    title: "Close to home",
    copy: "Store at 20 Akatea Road, Glendene. A local yard within easy reach of Henderson, Te Atatu and New Lynn.",
  },
  {
    number: "02",
    title: "From $200 + GST a month",
    copy: "Pay for the space you need, with monthly billing and no deposit. Send your length and start date for a quote.",
  },
  {
    number: "03",
    title: "Check slipway access",
    copy: "The slipway is under repair and haul-out facilities are a work in progress. Contact the yard before planning a launch or haul-out.",
  },
];

const faqs = [
  {
    question: "Where is West Auckland Storage?",
    answer:
      "We’re at Span Farm Boat Yard, 20 Akatea Road, Glendene 0602 — a short drive from Henderson, Massey, Te Atatu, New Lynn, Kelston and Titirangi.",
  },
    {
    question: "What does storage cost?",
    answer:
      "Outdoor storage starts from $200 + GST per month, billed monthly with no deposit. The exact price depends on what you’re storing and how much room it needs. Call the yard on 09 818 4586 with the length (including the trailer) and your start date and we’ll give you a straight answer.",
  },
  {
    question: "What can I store?",
    answer:
      "Boats on trailers up to 40ft, caravans, trailers, cars, 4WDs, utes, trucks, jet skis and kayaks. We also store shipping containers — 20ft and 40ft, with container pricing on request. We don’t take household storage. Tell us what you’ve got and we’ll work out a spot that fits.",
  },
  {
    question: "Is the yard secure?",
    answer:
      "Yes. The yard is gated, covered by CCTV and looked after by an on-site manager. Owners are welcome to work on their boats with pre-approval from the site manager, and there are toilets on site plus a hose for washing down boats and trailers.",
  },
  {
    question: "When can I get to my boat?",
    answer:
      "Daylight hours are best for general access. After hours you can get in with a gate code, and 24/7 access is available by prior arrangement — just tell us what you need when you book.",
  },
  {
    question: "Can I store something short-term?",
    answer:
      "Yes. Plenty of owners use the yard just for winter or between trips, while others stay longer term. Terms are flexible, so it’s easy to start with one season and take it from there.",
  },
    {
    question: "Is the slipway available?",
    answer:
      "The slipway is currently under repair and haul-out facilities are a work in progress. Contact the yard before planning a launch or haul-out.",
  },
];
---

<PageLayout home title="West Auckland Storage | Boat, Caravan & Vehicle Storage" description="Secure, affordable boat and caravan storage close to home in West Auckland. Store at Span Farm Boat Yard in Glendene.">
    <main id="main">
      <section class="hero">
        <div class="hero-image" aria-hidden="true"></div>
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <p class="eyebrow eyebrow-light">Boat, caravan &amp; vehicle storage in Glendene</p>
          <h1>Free up space.<br /><em>Keep it local.</em></h1>
                    <p class="hero-lede">Outdoor storage at Span Farm Boat Yard from $200 + GST a month. A gated yard with CCTV and an on-site manager. No deposit required.</p>
          <div class="hero-actions">
            <a class="button button-bright" href="#contact">Get a storage quote</a>
            <a class="text-link text-link-light" href="tel:098184586">Call 09 818 4586</a>
          </div>
                    <div class="hero-note">
            <span class="note-line"></span>
            <span>{yearsSinceIncorporation}+ years since incorporation · {averageRating.toFixed(1)} out of 5 from {reviewCount} owner reviews.</span>
          </div>
        </div>
        <div class="hero-stamp" aria-hidden="true">
          <span>WEST</span><strong>AUCKLAND</strong><span>STORAGE</span>
        </div>
            </section>

      <section class="pillars-section section-pad">
        <div class="container">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Location, price &amp; yard access</p>
              <h2>Know where<br /><span>you stand.</span></h2>
            </div>
            <p>Check the location, starting price and slipway status before you make plans.</p>
          </div>
          <div class="pillar-grid">
            {pillars.map((pillar) => (
              <article class="pillar-card">
                <span class="pillar-number">{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="intro section-pad">
        <div class="container intro-grid">
          <div>
            <p class="eyebrow">A working boat yard</p>
            <h2>More room<br /><span>at home.</span></h2>
          </div>
          <div class="intro-copy">
            <p class="large-copy">Get your driveway back without storing your boat or caravan miles from home.</p>
            <p>Our outdoor yard in Glendene offers flexible terms for a season or a longer stay. West Auckland Storage is part of Span Farm Boat Yard, a company established in 2008.</p>
            <a class="text-link" href="#why-us">See what the yard offers <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section id="storage" class="storage-section section-pad">
        <div class="container">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Find the storage you need</p>
              <h2>Your boat, caravan<br /><span>or vehicle.</span></h2>
            </div>
            <p>Keep it here between trips or for the season. Send us its length, including the trailer, and we'll check availability.</p>
          </div>
          <div class="service-grid">
            {services.map((service) => (
              <article class="service-card">
                <div class="service-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <span class="service-number">{service.number}</span>
                </div>
                <div class="service-body">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <a class="text-link" href={service.href}>View storage details <span aria-hidden="true">→</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" class="why-section">
        <div class="why-photo">
          <img src="/images/yard-boat.jpg" alt="Boat stored at the Span Farm Boat Yard" loading="lazy" />
          <span class="photo-caption">20 Akatea Road · Glendene</span>
        </div>
        <div class="why-content section-pad">
          <p class="eyebrow eyebrow-light">Why West Auckland Storage</p>
          <h2>Run by people<br />who know <em>boats.</em></h2>
          <p class="why-lede">Speak to Jeff, our on-site manager, about the space and access you need. Owners can work on their boats with the site manager's pre-approval.</p>
          <ul class="check-list">
            <li><span>01</span><div><strong>Close to home</strong><small>Right in Glendene, serving West Auckland.</small></div></li>
            <li><span>02</span><div><strong>Fair value</strong><small>Storage priced for the space you need.</small></div></li>
                        <li><span>03</span><div><strong>No deposit required</strong><small>Flexible terms and monthly invoicing.</small></div></li>
            <li><span>04</span><div><strong>Gated yard with CCTV</strong><small>An on-site manager looks after the yard.</small></div></li>
          </ul>
                    <div class="yard-stats">
            <div><strong>{yearsSinceIncorporation}+</strong><small>years since incorporation</small></div>
            <div><strong>15,000+</strong><small>boats stored over our history</small></div>
          </div>
                    <a class="button button-outline-light" href="#contact">Check available space</a>
        </div>
      </section>

            <section class="value-band">
              <div class="container">
                <p class="value-line">From $200 + GST<br />per month.</p>
                <p class="value-sub">No deposit required. Send the length, including the trailer, and your start date. We'll confirm the price for your space and current availability.</p>
                <a class="button button-bright" href="#contact">Get my storage quote</a>
              </div>
            </section>

            <section class="location-section section-pad">
        <div class="container location-grid">
          <div class="location-copy">
            <p class="eyebrow">Find your spot</p>
            <h2>Close to home.<br /><span>In Glendene.</span></h2>
            <p>Find Span Farm Boat Yard at 20 Akatea Road, within easy reach of Henderson, Te Atatu, New Lynn and the wider West Auckland area.</p>
            <address>20 Akatea Road<br />Glendene, Auckland 0602</address>
            <a class="text-link" href="https://maps.app.goo.gl/a359LycS4y4m8mbS9" target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>
          </div>
          <div class="location-image">
            <img src="/images/glendene.jpg" alt="Auckland landscape near Glendene" loading="lazy" />
            <div class="location-pin" aria-hidden="true"><span>20</span><small>AKATEA<br />ROAD</small></div>
          </div>
        </div>
      </section>

            <section class="why-section slipway-section">
              <div class="why-photo">
                <img src="/images/boat-trailer.jpg" alt="A trailer boat at Span Farm Boat Yard" loading="lazy" />
                <span class="photo-caption">Span Farm Boat Yard · Glendene</span>
              </div>
              <div class="why-content section-pad">
                                <p class="eyebrow eyebrow-light">Slipway &amp; haul-out status</p>
                                <h2>Planning a launch?<br /><em>Check with us.</em></h2>
                <p class="why-lede">The slipway is currently under repair. Haul-out facilities are a work in progress. Contact the yard before making plans that depend on either.</p>
                                <a class="button button-outline-light" href="#contact" data-enquiry-item="Slipway access">Ask about the slipway</a>
              </div>
            </section>

            <figure class="yard-band">
              <img src="/images/boats-yard.jpg" alt="Boats and trailers stored on the hardstand at Span Farm Boat Yard" loading="lazy" />
              <figcaption class="photo-caption">Hardstand · Span Farm Boat Yard, Glendene</figcaption>
            </figure>

            <section id="faq" class="faq-section section-pad">
        <div class="container faq-grid">
          <div>
            <p class="eyebrow">Good to know</p>
            <h2>Questions,<br /><span>answered.</span></h2>
          </div>
          <div class="faq-list">
            {faqs.map((faq, index) => (
              <details open={index === 0}>
                <summary><span>{faq.question}</span><b aria-hidden="true">+</b></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section class="reviews-section section-pad">
        <div class="container">
          <div class="section-heading">
            <div>
              <p class="eyebrow">From the people who store here</p>
              <h2>Hear from<br /><span>other owners.</span></h2>
            </div>
            <p>Rated {averageRating.toFixed(1)} out of 5 across {reviewCount} owner reviews. Reviews describe past visits. The slipway is currently under repair and haul-out facilities are a work in progress.</p>
          </div>
          <ReviewSlider />
        </div>
      </section>

      <section id="contact" class="contact-section section-pad">
        <div class="container contact-grid">
          <div class="contact-intro">
            <p class="eyebrow eyebrow-light">Check the price &amp; available space</p>
            <h2>Get a quote<br /><em>for your spot.</em></h2>
            <p>Tell Jeff what you want to store, its length and your start date. He'll reply within 24 hours with the next steps. Prefer to talk? Call the yard.</p>
            <a class="contact-phone" href="tel:098184586">09 818 4586 <span>↗</span></a>
            <a class="contact-email" href="mailto:info@westaucklandstorage.co.nz">info@westaucklandstorage.co.nz</a>
          </div>
          <QuoteForm />
        </div>
      </section>
    </main>
</PageLayout>

<style>
  /* Keep the reference's industrial typography, blue palette and existing grids. */
  h1, h2 { line-height: .96; text-wrap: balance; }
  h3 { line-height: 1.08; }
  .hero-lede { max-width: 560px; line-height: 1.6; }
  .hero-note { color: #d8e7f2; font-size: 13px; letter-spacing: 0; line-height: 1.6; text-transform: none; }
  .note-line { flex-shrink: 0; }
  .hero-content { padding-bottom: 48px; }
  .hero h1 em { color: var(--blue-light); }
  .button { border-radius: 3px; transition: transform .2s ease, background-color .2s ease, box-shadow .2s ease; }
  .button-bright {
    background: var(--blue-bright);
    color: var(--wast-on-bright);
    border-color: var(--blue-bright);
    box-shadow: 0 3px 0 rgba(3, 27, 50, .5), 0 8px 20px rgba(3, 27, 50, .16);
  }
  .button-bright:hover, .button-bright:focus-visible { background: var(--blue-light); border-color: var(--blue-light); color: var(--blue-dark); }
  .button-outline-light { background: rgba(8, 46, 84, .25); transition: transform .2s ease; }
  .button-outline-light:hover, .button-outline-light:focus-visible { background: white; color: var(--blue-dark); }
  .button:active { transform: translateY(1px); box-shadow: none; }
  .button:focus-visible, .text-link:focus-visible { outline: 3px solid currentColor; outline-offset: 5px; }
  .text-link { line-height: 1.6; text-underline-offset: 5px; }
  .text-link:hover { text-decoration: underline; }
  .text-link-light:hover, .text-link-light:focus-visible { color: var(--blue-light); }
  .pillar-card, .service-card { border-radius: 0; box-shadow: none; }
  .pillar-card { border-bottom: 1px solid var(--line); }
  .pillar-card h3 { margin-top: 0; }
  .pillar-card p { line-height: 1.65; }
  .service-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--line);
    transition: border-color .2s ease;
  }
  .service-card:hover, .service-card:focus-within { border-color: var(--blue); }
  .service-image img { transition: none; }
  .service-card:hover .service-image img, .service-card:focus-within .service-image img { transform: none; }
  .service-image, .service-image img, .location-image, .location-image img,
  .why-photo, .why-photo img, .yard-band, .yard-band img { border-radius: 0; }
  .service-body { display: flex; flex: 1; flex-direction: column; align-items: start; }
  .service-body .text-link { margin-top: auto; }
  .check-list small { color: #d3e5f1; line-height: 1.6; }
  .photo-caption { max-width: calc(100% - 60px); padding: 8px 12px; background: rgba(8, 46, 84, .9); text-shadow: none; }
  .value-sub { line-height: 1.7; }
  .value-band .button { margin-top: 8px; }
  .faq-list summary { min-height: 64px; transition: color .2s ease; }
  .faq-list summary:hover, .faq-list details[open] summary { color: var(--blue); }
  .faq-list summary b { flex-shrink: 0; }
  .faq-list details p { font-size: 16px; line-height: 1.7; }
  .contact-email { overflow-wrap: anywhere; text-underline-offset: 4px; }
  .contact-email:hover, .contact-phone:hover { text-decoration: underline; }
  @media (min-width: 681px) {
    .hero-content { padding-top: 150px; }
  }
  @media (max-width: 680px) {
    .hero-content { padding-bottom: 40px; }
    .hero-actions .button { min-width: 220px; }
    .hero-note { max-width: 100%; margin-top: 48px; }
    .section-heading { margin-bottom: 32px; }
    .faq-list details p { margin-right: 12px; }
    .photo-caption { left: 18px; max-width: calc(100% - 36px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .button, .service-image img { transform: none !important; }
  }
</style>
```

## src/components/QuoteForm.astro

```astro
<form id="enquiry" class="quote-form" data-contact-form method="post" action="/api/contact">
  <div class="form-row">
    <label>Your name (required) <input name="name" required autocomplete="name" placeholder="Your full name" /></label>
    <label>Phone or email (required) <input name="contact" required placeholder="Your phone or email" /></label>
  </div>
  <label>What are you storing? (required)
    <select name="item" required>
      <option value="">Choose one</option>
      <option>Boat</option><option>Caravan</option><option>Trailer</option><option>Vehicle or other gear</option><option>Truck</option><option>Business equipment</option><option>Shipping container</option><option>Slipway access</option>
    </select>
  </label>
  <div class="form-row">
    <label>Length, including trailer <input name="length" placeholder="For example, 6 metres" /></label>
    <label>Preferred start date <input name="startDate" type="date" /></label>
  </div>
  <p class="form-note">Length and start date are optional, but help Jeff quote. Estimates are fine. He'll confirm the details with you.</p>
  <label>Anything else? (optional) <textarea name="message" rows="4" placeholder="Tell us about access needs or ask a question about the yard"></textarea></label>
  <div class="form-honey" aria-hidden="true">
    <label>Leave this field empty <input name="company" tabindex="-1" autocomplete="off" /></label>
  </div>
  <button class="button button-bright" type="submit">Send enquiry</button>
  <p class="form-note">Your enquiry goes to Jeff at the yard. Expect a reply within 24 hours. Prefer to call? <a href="tel:098184586">09 818 4586</a>.</p>
  <p class="form-status" role="status" aria-live="polite"></p>
</form>

<style>
  .quote-form { border: 1px solid var(--line); border-top: 4px solid var(--blue-bright); box-shadow: 0 16px 40px rgba(8, 46, 84, .12); }
  .quote-form label { letter-spacing: 0; text-transform: none; line-height: 1.5; }
  .quote-form input, .quote-form select, .quote-form textarea {
    min-width: 0;
    min-height: 48px;
    border-color: #8196a7;
    border-radius: 3px;
    transition: border-color .2s ease, box-shadow .2s ease;
  }
  .quote-form input::placeholder, .quote-form textarea::placeholder { color: #586c7c; opacity: 1; }
  .quote-form input:focus, .quote-form select:focus, .quote-form textarea:focus {
    border-color: var(--blue);
    outline: 2px solid var(--blue);
    outline-offset: 2px;
    box-shadow: none;
    background: white;
  }
  .quote-form .button { border: 1px solid var(--blue); background: var(--blue); color: white; border-radius: 3px; box-shadow: 0 3px 0 var(--blue-dark); }
  .quote-form .button:hover:not(:disabled), .quote-form .button:focus-visible { background: var(--blue-dark); color: white; }
  .quote-form .button:focus-visible { outline: 3px solid var(--blue); outline-offset: 5px; }
  .quote-form .button:active:not(:disabled) { transform: translateY(1px); box-shadow: none; }
  .quote-form .button:disabled { opacity: .65; cursor: wait; transform: none; box-shadow: none; }
  .form-note, .form-status { font-size: 13px; line-height: 1.6; }
  .form-row + .form-note { margin: -4px 0 20px; }
  .form-status:empty { margin: 0; }
  .form-status:not(:empty) { padding: 12px; background: var(--paper); border-left: 3px solid var(--blue); }
</style>

<script>
  import { storageOptions } from '../data/sitePages';
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach(form => {
    const status = form.querySelector<HTMLElement>('.form-status');
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const setStatus = (text: string) => { if (status) status.textContent = text; };
    const item = form.elements.namedItem('item') as HTMLSelectElement;
    const params = new URLSearchParams(window.location.search);
    const requestedItem = params.get('item');
    const allowedItems = Array.from(item.options).map(option => option.value);
    if (requestedItem && allowedItems.includes(requestedItem)) item.value = requestedItem;
    const requestedSource = params.get('from') || '';
    const source = storageOptions.some(option => `/${option.slug}/` === requestedSource) ? requestedSource : window.location.pathname;

    document.querySelectorAll<HTMLAnchorElement>('[data-enquiry-item]').forEach(link => {
      link.addEventListener('click', () => {
        const choice = link.dataset.enquiryItem || '';
        if (allowedItems.includes(choice)) item.value = choice;
      });
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const data = new FormData(form);
      submit?.setAttribute('disabled', 'true');
      setStatus('Sending your enquiry…');
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            name: data.get('name'),
            contact: data.get('contact'),
            item: data.get('item'),
            message: [data.get('length') ? `Length including trailer: ${data.get('length')}` : '', data.get('startDate') ? `Preferred start date: ${data.get('startDate')}` : '', data.get('message')].filter(Boolean).join('\n'),
            company: data.get('company'),
            page: source,
          }),
        });
        const result = await response.json();
        if (!response.ok || result.ok !== true) throw new Error('Delivery not confirmed');
        form.reset();
        setStatus('Thanks, your enquiry has been sent. We’ll come back to you within 24 hours. Prefer to talk? Call 09 818 4586.');
      } catch {
        setStatus('Your enquiry has not been sent. Your details are still here. Please try again or call 09 818 4586.');
      } finally {
        submit?.removeAttribute('disabled');
      }
    });
  });
</script>
```
