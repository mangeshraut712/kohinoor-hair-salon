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
  assert.doesNotMatch(html, /sagar\._7716|Sagar Kale|4\.5 from 49|aggregateRating|openingHoursSpecification|7:30 AM|PRICE PENDING|PHOTO PENDING|Number pending|embed slot/);
  for (const key of ['telephone','priceRange','review','openingHours']) assert.equal(key in ld, false);
});
test('only direct contact and map links; no third-party embeds or collection', () => {
  assert.doesNotMatch(visible, /<iframe\b|<form\b|href="tel:|wa\.me/);
  assert.match(visible, /href="https:\/\/www\.instagram\.com\/the_kohinoor_salon\//);
  assert.match(visible, /href="https:\/\/maps\.app\.goo\.gl\/141XQMZtooLVQQN29/);
});
test('preview is non-indexable; production export uses one canonical origin', () => {
  const origin = process.env.CLOUDFLARE_SITE_URL || 'https://kohinoor-hair-salon.pages.dev';
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
