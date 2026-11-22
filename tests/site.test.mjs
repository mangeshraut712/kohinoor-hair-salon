import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const out = join(root, 'out-cloudflare');
const read = (p) => readFileSync(join(root, p), 'utf8');

const salon = read('src/data/salon.ts');
const content = read('CONTENT.md');
const needOut = () =>
  assert.ok(existsSync(join(out, 'index.html')), 'Run `npm run build:cloudflare` before `npm test`.');
const html = () => (needOut(), readFileSync(join(out, 'index.html'), 'utf8').replace(/<!-- -->/g, ''));

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

test('data: verified facts match CONTENT.md', () => {
  for (const fact of [
    'Shivaji Chowk, near Bhavani Sweet Home, Sharda Colony',
    '18.571585',
    '73.793096',
    '411027',
    '/g/11fj45w_w0',
    '@the_kohinoor_salon',
    '@sagar._7716',
    'Sagar Kale',
  ]) {
    assert.ok(content.includes(fact), `CONTENT.md missing ${fact}`);
    assert.ok(salon.includes(fact), `salon.ts missing ${fact}`);
  }
  assert.match(salon, /rating: 4\.5/);
  assert.match(salon, /reviewCount: 49/);
  assert.match(salon, /7:30 AM – 12:00 PM/);
  assert.match(salon, /7:30 AM – 10:00 PM/);
});

test('data: pending owner fields are null and prices are not invented', () => {
  for (const f of ['phone', 'whatsapp', 'heroPhotoUrl', 'staff', 'reviewQuotes']) {
    assert.match(salon, new RegExp(`${f}: null as`), `${f} must be null`);
  }
  assert.ok(!/priceInr: (?!null)/.test(salon.replace(/priceInr: number \| null/, '')), 'priceInr must be null');
});

test('export: required files exist', () => {
  needOut();
  for (const f of ['index.html', 'robots.txt', 'sitemap.xml']) {
    assert.ok(existsSync(join(out, f)), `${f} missing`);
  }
  assert.match(readFileSync(join(out, 'robots.txt'), 'utf8'), /Sitemap: https:\/\//);
  assert.match(readFileSync(join(out, 'sitemap.xml'), 'utf8'), /<loc>https:\/\/[^<]+\/<\/loc>/);
});

test('JSON-LD: valid HairSalon with only verified fields', () => {
  const m = html().match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(m, 'JSON-LD script missing');
  const ld = JSON.parse(m[1]);
  assert.equal(ld['@context'], 'https://schema.org');
  assert.equal(ld['@type'], 'HairSalon');
  assert.equal(ld.address.postalCode, '411027');
  assert.equal(ld.geo.latitude, 18.571585);
  assert.equal(ld.geo.longitude, 73.793096);
  assert.equal(ld.aggregateRating.ratingValue, 4.5);
  assert.equal(ld.aggregateRating.reviewCount, 49);
  assert.equal('telephone' in ld, false, 'telephone must be absent while phone is null');
  assert.equal('priceRange' in ld, false);
});

test('content: no invented contact or price leaks in rendered HTML', () => {
  const h = html();
  assert.ok(!/href="tel:/.test(h), 'tel: link present while phone is null');
  assert.ok(!/wa\.me\//.test(h), 'wa.me link present while whatsapp is null');
  const text = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  assert.ok(!/₹\s?\d/.test(text), 'invented rupee price found');
  assert.ok(!/(\+91|\b91)[\s-]?\d{10}\b/.test(text), 'phone-like number found');
  assert.ok(!/lorem ipsum|TODO/i.test(text));
  assert.ok(text.includes('Rate confirmed at shop'));
  assert.ok(text.includes('Number pending'));
});

test('content: key facts are rendered', () => {
  const h = html();
  for (const s of ['4.5 / 5', '49', 'Sagar Kale', '@the_kohinoor_salon', '@sagar._7716', 'Hair &amp; Cuts', 'Beard &amp; Shave', 'Skin &amp; Grooming', '411027']) {
    assert.ok(h.includes(s), `missing ${s}`);
  }
  assert.ok(h.includes('7:30 AM – 12:00 PM') && h.includes('7:30 AM – 10:00 PM'));
  assert.ok(h.includes('destination=18.571585,73.793096'));
  assert.ok(h.includes('maps.apple.com'));
  assert.ok(h.includes('q=18.571585,73.793096'));
});

test('a11y: landmarks, single h1, heading order, titles, labels', () => {
  const h = html();
  assert.equal((h.match(/<h1[\s>]/g) || []).length, 1);
  assert.ok(/<main[^>]*id="main-content"/.test(h));
  assert.ok(/<header/.test(h) && /<footer/.test(h) && /<nav/.test(h));
  assert.ok(/href="#main-content"/.test(h));
  assert.ok(/<html lang="/.test(h));
  const levels = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  levels.forEach((l, i) => {
    if (i > 0) assert.ok(l <= levels[i - 1] + 1, `heading jump h${levels[i - 1]} -> h${l}`);
  });
  for (const m of h.matchAll(/<iframe[^>]*>/g)) assert.match(m[0], /title="[^"]+"/);
  for (const m of h.matchAll(/<img[^>]*>/g)) assert.match(m[0], /alt="[^"]*"/);
  for (const m of h.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) {
    const inner = m[1].replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').trim();
    assert.ok(inner || /aria-label=/.test(m[0]), `empty link: ${m[0].slice(0, 80)}`);
  }
  for (const m of h.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/g)) {
    assert.ok(m[1].replace(/<[^>]+>/g, '').trim(), 'empty button');
  }
  for (const m of h.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert.match(m[0], /rel="noopener noreferrer"/);
  }
  for (const id of ['inq-name', 'inq-mobile', 'inq-service', 'inq-day', 'inq-slot', 'inq-notes']) {
    assert.ok(h.includes(`for="${id}"`), `label for ${id}`);
  }
});

test('links: internal anchors resolve to ids', () => {
  const h = html();
  const ids = new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const anchors = [...h.matchAll(/href="#([^"]*)"/g)].map((m) => m[1]);
  assert.ok(anchors.length > 5);
  for (const a of anchors) assert.ok(ids.has(a), `broken anchor #${a}`);
});

test('design: no banned styles or emoji in source', () => {
  const files = [...walk(join(root, 'src'))].filter((f) => /\.(tsx?|css)$/.test(f));
  for (const f of files) {
    const s = readFileSync(f, 'utf8');
    assert.ok(!/backdrop-blur|backdrop-filter/.test(s), `glassmorphism in ${f}`);
    assert.ok(!/\p{Extended_Pictographic}/u.test(s.replace(/[₹]/g, '')), `emoji in ${f}`);
    assert.ok(!/gradient/.test(s), `gradient in ${f}`);
  }
});

test('no committed secrets or stray files', () => {
  for (const f of ['.env', '.DS_Store']) assert.equal(existsSync(join(root, f)), false);
});
