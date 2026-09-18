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
  // Provider-specific failure codes so logs show which path failed.
  const emailFailure = await (await post(enquiry, env)).json();
  assert.equal(emailFailure.error, 'email_failed');
  const webhookFailure = await (await post(enquiry, { CONTACT_WEBHOOK_URL: 'https://example.test' })).json();
  assert.equal(webhookFailure.error, 'webhook_failed');
  globalThis.fetch = originalFetch;
  // Malformed JSON body must be rejected as an invalid payload, not a 500.
  const malformed = await onRequestPost({
    request: new Request('https://example.test/api/contact', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: '{ not json',
    }), env: {},
  });
  assert.equal(malformed.status, 400);
  assert.equal((await malformed.json()).error, 'missing_fields');
  // A JSON body with every required field blank must report missing fields.
  const blank = await post({ name: '   ', contact: '', item: '', message: 'hello' });
  assert.equal(blank.status, 400);
  assert.equal((await blank.json()).error, 'missing_fields');
  // Numbers and arrays are coerced to empty strings, so they fail validation.
  assert.equal((await post({ name: 12, contact: ['a'], item: {}, message: '' })).status, 400);
  // multipart/form-data bodies (the no-JavaScript fallback) must also work.
  const form = new FormData();
  form.set('name', 'Form owner');
  form.set('contact', '09 111 1111');
  form.set('item', 'Caravan');
  const formResult = await onRequestPost({
    request: new Request('https://example.test/api/contact', { method: 'POST', body: form }),
    env: {},
  });
  assert.equal(formResult.status, 503, 'A valid form post with no provider configured must reach not_configured');
  const blankForm = new FormData();
  blankForm.set('name', 'Form owner');
  const blankFormResult = await onRequestPost({
    request: new Request('https://example.test/api/contact', { method: 'POST', body: blankForm }),
    env: {},
  });
  assert.equal(blankFormResult.status, 400);
  assert.equal((await blankFormResult.json()).error, 'missing_fields');
  // A multipart body missing the item field fails the same way.
  const noItemForm = new FormData();
  noItemForm.set('name', 'Form owner');
  noItemForm.set('contact', '09 111 1111');
  const noItemResult = await onRequestPost({
    request: new Request('https://example.test/api/contact', { method: 'POST', body: noItemForm }),
    env: {},
  });
  assert.equal(noItemResult.status, 400);
  assert.equal((await noItemResult.json()).error, 'missing_fields');
  console.log('Contact checks passed. Provider calls were mocked; no emails sent.');
} finally {
  globalThis.fetch = originalFetch;
}
