/**
 * Enquiry endpoint — POST /api/contact
 *
 * Cloudflare Pages Function. The enquiry form posts here so the submission
 * happens on-site, instead of the old mailto: hand-off that silently failed
 * for anyone without a mail client configured (the biggest conversion leak).
 *
 * Configure ONE of these in the Pages project's environment variables:
 *
 *   CONTACT_WEBHOOK_URL
 *     Any endpoint that accepts a JSON POST (Formspree, Make, Zapier, n8n).
 *
 *   RESEND_API_KEY  (+ CONTACT_TO, optional CONTACT_FROM)
 *     Send the enquiry as email through Resend.
 *
 * Until a provider is configured the endpoint replies 503 and the form
 * keeps entered details visible for retry and offers the yard phone number.
 */

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const clean = (value, max = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

async function readPayload(request) {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405);
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await readPayload(request);
  } catch {
    return json({ ok: false, error: 'invalid_payload' }, 400);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return json({ ok: false, error: 'invalid_payload' }, 400);
  }

  // Honeypot: a real visitor never fills this hidden field in.
  if (clean(data.company)) return json({ ok: true });

  const enquiry = {
    name: clean(data.name, 120),
    contact: clean(data.contact, 200),
    item: clean(data.item, 60),
    message: clean(data.message, 4000),
    page: clean(data.page, 300),
    receivedAt: new Date().toISOString(),
  };

  if (!enquiry.name || !enquiry.contact || !enquiry.item) {
    return json({ ok: false, error: 'missing_fields' }, 400);
  }

  const text = [
    `Name: ${enquiry.name}`,
    `Contact: ${enquiry.contact}`,
    `Storing: ${enquiry.item}`,
    `Details: ${enquiry.message || 'None provided'}`,
    enquiry.page ? `Page: ${enquiry.page}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    if (env.CONTACT_WEBHOOK_URL) {
      const response = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ subject: `Storage enquiry from ${enquiry.name}`, ...enquiry }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
      return json({ ok: true });
    }

    if (env.RESEND_API_KEY && env.CONTACT_TO) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: env.CONTACT_FROM || 'West Auckland Storage <website@westaucklandstorage.co.nz>',
          to: [env.CONTACT_TO],
          ...(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.contact) ? { reply_to: enquiry.contact } : {}),
          subject: `Storage enquiry from ${enquiry.name}`,
          text,
        }),
      });
      if (!response.ok) throw new Error(`Resend responded ${response.status}`);
      return json({ ok: true });
    }
  } catch {
    return json({ ok: false, error: 'delivery_failed' }, 502);
  }

  return json({ ok: false, error: 'not_configured' }, 503);
}
