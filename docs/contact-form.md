# Contact form delivery

The shared Astro form submits to `/api/contact`, handled by `functions/api/contact.js` on Cloudflare Pages. It shows confirmation only after the provider accepts the request. If delivery fails, it keeps the visitor's details for retry and displays the phone number. It does not open an email app automatically.

Configure one delivery option in the Pages project under Settings > Variables and Secrets, then redeploy:

- `CONTACT_WEBHOOK_URL`: an endpoint that accepts the enquiry as JSON.
- Or `RESEND_API_KEY` as a secret, `CONTACT_TO` as the receiving address, and `CONTACT_FROM` as a sender on a domain verified in Resend.

Never put API keys in `PUBLIC_` variables or commit them. Preview and production environments need their own configuration. Astro preview serves static pages only; use Cloudflare Pages or Wrangler Pages dev to run the function.

The JSON payload includes name, contact, item, message, page and receivedAt. Phone numbers stay in the message body. Email contacts also become the reply-to address.

Run `node scripts/check-contact.mjs` to check validation and delivery outcomes with mocked providers. A real delivery check still needs configured credentials and an authorised test recipient.

References: [Cloudflare bindings](https://developers.cloudflare.com/pages/functions/bindings/) and [Resend email API](https://resend.com/docs/api-reference/emails/send-email).
