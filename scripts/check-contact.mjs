import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/contact.js';

const enquiry = { name: 'Test owner', contact: '09 000 0000', item: 'Boat' };
const post = (data, env = {}) => onRequestPost({
  request: new Request('https://example.test/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data),
  }), env,
});
const originalFetch = globalThis.fetch;
let sent;
try {
  globalThis.fetch = async (_url, options) => {
    sent = JSON.parse(options.body);
    return new Response('{"id":"test"}', { status: 200 });
  };
  assert.equal((await post(null)).status, 400);
  assert.equal((await post({})).status, 400);
  assert.equal((await post(enquiry)).status, 503);
  assert.equal((await post({ ...enquiry, company: 'spam' })).status, 200);
  const env = { RESEND_API_KEY: 'test', CONTACT_TO: 'test@example.test' };
  assert.equal((await post(enquiry, env)).status, 200);
  assert.equal('reply_to' in sent, false, 'Phone numbers must not become email reply-to addresses');
  assert.equal((await post({ ...enquiry, contact: 'owner@example.test' }, env)).status, 200);
  assert.equal(sent.reply_to, 'owner@example.test');
  assert.equal((await post(enquiry, { CONTACT_WEBHOOK_URL: 'https://example.test' })).status, 200);
  globalThis.fetch = async () => new Response('', { status: 500 });
  assert.equal((await post(enquiry, env)).status, 502);
  console.log('Contact checks passed. Provider calls were mocked; no emails sent.');
} finally {
  globalThis.fetch = originalFetch;
}
