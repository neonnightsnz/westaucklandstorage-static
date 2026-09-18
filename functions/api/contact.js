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

const json = (/** @type {Record<string, unknown>} */ payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

const clean = (/** @type {unknown} */ value, max = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';
/** @param {Request} request */
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

/** @returns {Response} */
export function onRequestGet() {
  return json({ ok: false, error: 'method_not_allowed' }, 405);
}

/**
 * @param {{ request: Request, env: Record<string, string | undefined> }} context
 * @returns {Promise<Response>}
 */
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
  /** @type {Record<string, unknown>} */
  const fields = data;
  const asField = (key) => clean(fields[key], 4000);
  // Honeypot: a real visitor never fills this hidden field in.
  if (asField('company')) return json({ ok: true });

  const enquiry = {
    name: clean(fields.name, 120),
    contact: clean(fields.contact, 200),
    item: clean(fields.item, 60),
    message: clean(fields.message, 4000),
    page: clean(fields.page, 300),
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

  const provider = env.CONTACT_WEBHOOK_URL ? 'webhook' : 'resend';
  try {
    if (env.CONTACT_WEBHOOK_URL) {
      const response = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ subject: `Storage enquiry from ${enquiry.name}`, ...enquiry }),
      });
      if (!response.ok) {
        const error = new Error(`webhook responded ${response.status}`);
        error.status = response.status;
        throw error;
      }
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
          if (!response.ok) {
            const error = new Error(`resend responded ${response.status}`);
            error.status = response.status;
            throw error;
          }
          return json({ ok: true });
        }
      } catch (error) {
        // Provider-specific codes so Cloudflare logs show which path failed.
        console.error('contact delivery failed', {
          provider,
          status: error?.status,
          message: error?.message,
        });
        return json(
          { ok: false, error: provider === 'webhook' ? 'webhook_failed' : 'email_failed' },
          502,
        );
      }
      return json({ ok: false, error: 'not_configured' }, 503);
}
