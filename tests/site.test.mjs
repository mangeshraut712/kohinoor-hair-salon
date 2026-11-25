import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const out = join(root, 'out-cloudflare');
const read = (p) => readFileSync(join(root, p), 'utf8');

const salon = read('src/data/salon.ts');
const content = read('docs/CONTENT.md');
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
    'Shivaji Chowk, Near Bhavani Sweet Home, Main Road Gavthan',
    '18.571585',
    '73.793096',
    '411027',
    '/g/11fj45w_w0',
    '@the_kohinoor_salon',
  ]) {
    assert.ok(content.includes(fact), `CONTENT.md missing ${fact}`);
    assert.ok(salon.includes(fact), `salon.ts missing ${fact}`);
  }

});

test('data: pending owner fields are null and prices are not invented', () => {
  for (const f of ['whatsapp', 'heroPhotoUrl']) {
    assert.match(salon, new RegExp(`${f}: null as`), `${f} must be null`);
  }
  assert.ok(!/priceInr: (?!null)/.test(salon.replace(/priceInr: number \| null/, '')), 'priceInr must be null');
});

test('export: required files exist', () => {
  needOut();
  for (const f of ['index.html', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'apple-touch-icon.png']) {
    assert.ok(existsSync(join(out, f)), `${f} missing`);
  }
  if (process.env.KOHINOOR_PREVIEW === '1') return;
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
  assert.equal(ld.telephone, '+919764048382');
  assert.equal('priceRange' in ld, false);
  assert.equal('founder' in ld, false, 'owner is not verified as founder');
});

test('content: no invented contact or price leaks in rendered HTML', () => {
  const h = html();
  assert.ok(!/wa\.me\//.test(h), 'wa.me link present while whatsapp is null');
  const text = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  assert.ok(!/₹\s?\d/.test(text), 'invented rupee price found');
  assert.ok(!/lorem ipsum|TODO/i.test(text));
  assert.ok(text.includes('Rate confirmed at shop'));
  assert.ok(text.includes('Open shop Instagram'));
});

test('content: key facts are rendered', () => {
  const h = html();
  for (const s of ['@the_kohinoor_salon', 'Hair &amp; Cuts', 'Beard &amp; Shave', 'Skin &amp; Grooming', '411027']) {
    assert.ok(h.includes(s), `missing ${s}`);
  }
  assert.ok(h.includes('/141XQMZtooLVQQN29'));
  assert.ok(h.includes('maps.apple.com'));
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

test('services: only verified broad categories, no invented sub-items', () => {
  const board = salon.slice(salon.indexOf('export const SERVICE_BOARD'), salon.indexOf('export const RATE_LABEL'));
  const names = [...board.matchAll(/name: '([^']+)'/g)].map((m) => m[1]);
  assert.deepEqual(names, ['Hair', 'Beard & Shave', 'Skin']);
  for (const t of ['Hair & Cuts', 'Beard & Shave', 'Skin & Grooming']) assert.ok(board.includes(`title: '${t}'`), t);
  assert.ok(!/colou?r|add-ons|facial/i.test(board), 'unverified services must not be listed');
});

test('polish: fonts via next/font, nav closes on click and restores keyboard focus', () => {
  const layout = read('src/app/layout.tsx');
  assert.match(layout, /Fraunces[\s\S]*display: 'swap'/);
  assert.match(layout, /Plus_Jakarta_Sans/);
  assert.match(read('src/app/globals.css'), /--font-display: var\(--font-fraunces\)/);
  const nav = read('src/components/MastheadNav.tsx');
  assert.match(nav, /target\?\.scrollIntoView\(\{ block: 'start' \}\)/);
  assert.ok(nav.includes('max-h-[calc(100dvh-8.5rem)]') && nav.includes('overflow-y-auto'));
  assert.match(nav, /querySelector\('summary'\)\?\.focus\(\)/);
});

test('editorial images ship with the export and link visitors to the salon’s own reels', () => {
  const page = html();
  for (const name of ['haircut', 'beard', 'grooming']) {
    const path = `images/${name}.webp`;
    assert.ok(existsSync(join(out, path)), path);
    assert.ok(page.includes(`src="/${path}"`), path);
  }
  assert.ok(page.includes('Editorial photography'));
  assert.ok(page.includes('href="https://www.instagram.com/the_kohinoor_salon/reels/"'));
});

test('whatsapp.ts: normalizeNumber, buildWhatsAppLink, buildTelLink', async () => {
  const { normalizeNumber, buildWhatsAppLink, buildTelLink } = await import('../src/lib/whatsapp.ts');
  assert.equal(normalizeNumber(null), null);
  assert.equal(normalizeNumber('12345'), null);
  assert.equal(normalizeNumber('+91 98765-43210'), '919876543210');
  assert.equal(buildWhatsAppLink(null, 'hi'), null);
  assert.equal(buildWhatsAppLink('9876543210', 'hi'), null, 'bare 10-digit number has no country code');
  assert.equal(buildWhatsAppLink('+91 98765 43210', 'a b'), 'https://wa.me/919876543210?text=a%20b');
  assert.equal(buildTelLink(undefined), null);
  assert.equal(buildTelLink('9876543210'), null);
  assert.equal(buildTelLink('+91 98765 43210'), 'tel:+919876543210');
  assert.equal(buildWhatsAppLink('09876543210', 'hi'), null, 'trunk-prefixed 11-digit numbers are not a country code');
  assert.equal(buildTelLink('0 98765 43210'), null);
});

test('review fixes: validation, Escape close, icon, readonly data', () => {
  const nav = read('src/components/MastheadNav.tsx');
  assert.ok(nav.includes("'Escape'") && nav.includes('pointerdown'));
  assert.match(read('src/components/ContactActions.tsx'), /<Calendar /);
  assert.match(salon, /SERVICE_BOARD: readonly/);
});
