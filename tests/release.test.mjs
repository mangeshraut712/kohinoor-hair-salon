import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('out-cloudflare');
const read = (p) => readFileSync(resolve(root, p), 'utf8');
const html = read('index.html');
const visible = html.replace(/<script[\s\S]*?<\/script>/g, '');
const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);

test('unconfirmed and personal details are omitted throughout the release', () => {
  assert.doesNotMatch(html, /sagar\._7716|Sagar Kale|4\.5 from 49|aggregateRating|PRICE PENDING|PHOTO PENDING|Number pending|embed slot/);
  for (const key of ['priceRange','review','openingHours']) assert.equal(key in ld, false);
});
test('only direct contact and map links; no third-party embeds or collection', () => {
  assert.doesNotMatch(visible, /<iframe\b|<form\b|wa\.me/);
  assert.match(visible, /href="https:\/\/www\.instagram\.com\/the_kohinoor_salon\//);
  assert.match(visible, /href="https:\/\/maps\.app\.goo\.gl\/141XQMZtooLVQQN29/);
});
test('preview is non-indexable; production export uses one canonical origin', () => {
  const origin = new URL(process.env.CLOUDFLARE_SITE_URL || 'https://kohinoor-hair-salon.pages.dev').origin;
  if (process.env.KOHINOOR_PREVIEW === '1') {
    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.match(read('robots.txt'), /Allow: \//);
    assert.match(read('_headers'), /X-Robots-Tag: noindex, nofollow/);
    assert.doesNotMatch(read('sitemap.xml'), /<loc>/);
    assert.doesNotMatch(read('robots.txt'), /Sitemap:/);
  } else {
    assert.equal(existsSync(resolve(root, '_headers')), false);
    assert.ok(html.includes(`rel="canonical" href="${origin}/"`));
    assert.ok(read('robots.txt').includes(`Sitemap: ${origin}/sitemap.xml`));
    assert.ok(read('sitemap.xml').includes(`<loc>${origin}/</loc>`));
    assert.equal(ld.url, `${origin}/`);
  }
});
test('all first-render static assets and default error page are packaged', () => {
  const assets = [...html.matchAll(/(?:src|href)="(\/_next\/[^"]+)"/g)].map((m) => m[1]);
  assert.ok(assets.length > 0);
  for (const asset of assets) assert.ok(existsSync(resolve(root, '.' + asset)), asset);
  assert.ok(existsSync(resolve(root, '404.html')));
});

test('directions is the first mobile quick action and primary hero CTA', () => {
  const dock = visible.match(/<nav aria-label="Quick actions"[^>]*>(.*?)<\/nav>/s)[1];
  assert.match(dock, /^<a[^>]*href="https:\/\/maps\.app\.goo\.gl/);
  assert.match(visible, /href="https:\/\/maps\.app\.goo\.gl[^"]+"[^>]*class="btn btn-solid"/);
});

test('favicon and masthead use the official README emblem', () => {
  const readme = readFileSync('README.md', 'utf8');
  const emblem = readme.match(/<img src="public(\/brand\/[^"]+)"/)?.[1];
  assert.ok(emblem, 'README must embed the shop badge');
  assert.match(html, new RegExp(`rel="icon" href="${emblem.replaceAll('/', '\\/')}(?:\\?[^"]*)?"`));
  const badge = readFileSync(resolve(root, 'brand/kohinoor-emblem.webp'));
  assert.equal(badge.subarray(8, 12).toString(), 'WEBP');
  assert.ok(badge.length < 20_000);
  const favicon = readFileSync(resolve(root, 'favicon.ico'));
  assert.equal(favicon.subarray(0, 4).equals(Buffer.from([0, 0, 1, 0])), true, 'favicon.ico must be an ICO');
  const touch = readFileSync(resolve(root, 'apple-touch-icon.png'));
  assert.equal(touch.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])), true, 'apple-touch-icon.png must be a PNG');
  assert.match(html, /rel="apple-touch-icon" href="\/apple-touch-icon\.png/);
  const header = visible.match(/<header[^>]*>(.*?)<\/header>/s)[1];
  assert.match(header, /<img[^>]*alt=""[^>]*src="\/brand\/kohinoor-emblem\.webp"/);
  assert.match(header, /href="#top"/);
});

test('approved business identity, address, phone and hours agree with the page', () => {
  assert.match(visible, /lang="mr"[^>]*>द कोहिनूर एसी सलून \(पिंपळे निलख\)<\/p>/);
  assert.match(visible, /Shivaji Chowk, Near Bhavani Sweet Home, Main Road Gavthan, Pimple Nilakh, Pimpri-Chinchwad, Pune - 411027, Maharashtra/);
  assert.match(visible, /Sunday and Tuesday–Saturday/);
  assert.match(visible, /7:30 AM–10:00 PM/);
  assert.match(visible, /Monday<\/dt><dd[^>]*>Closed/);
  const phones = [...visible.matchAll(/href="tel:([^"]+)"/g)].map(([,phone]) => phone);
  assert.ok(phones.length >= 3);
  assert.ok(phones.every((phone) => phone === '+919764048382'));
  assert.equal(ld.name, 'The Kohinoor AC Salon (Pimple Nilakh)');
  assert.equal(ld.alternateName, 'द कोहिनूर एसी सलून (पिंपळे निलख)');
  assert.equal(ld.telephone, '+919764048382');
  assert.equal(ld.address.streetAddress, 'Shivaji Chowk, Near Bhavani Sweet Home, Main Road Gavthan');
  assert.deepEqual(ld.openingHoursSpecification, [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Sunday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:30',
    closes: '22:00',
  }]);
});

test('missing-page metadata is distinct from the salon homepage', () => {
  const missing = read('404.html');
  assert.match(missing, /<title>Page not found/);
  assert.match(missing, /name="robots" content="noindex/);
  assert.doesNotMatch(missing, /rel="canonical"|type="application\/ld\+json"/);
});
