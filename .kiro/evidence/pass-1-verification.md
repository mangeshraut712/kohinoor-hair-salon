# Pass 1 Verification

Scope: tasks 1-8 of `.kiro/specs/kohinoor-website/tasks.md`.

Commands run (all exit 0):
- `npm run lint`
- `npm run type-check`
- `npm run build:cloudflare` (static export to `out-cloudflare/`: `index.html`, `robots.txt`, `sitemap.xml`)
- `npm test` (11 tests pass)

What `tests/site.test.mjs` checks:
- `src/data/salon.ts` facts match `CONTENT.md`; phone, whatsapp, heroPhotoUrl, staff, reviewQuotes are `null`; all `priceInr` are `null`.
- Rendered HTML has no `tel:`/`wa.me` links, no phone-like numbers, no rupee prices; shows "Rate confirmed at shop" and "Number pending".
- JSON-LD parses as `HairSalon` with verified address, geo, rating, and no `telephone`.
- Single `h1`, no heading level jumps, skip link, landmarks, iframe `title`, form labels, no empty links/buttons, `rel="noopener noreferrer"` on external links.
- All `#anchor` links resolve to element ids.
- Source has no gradients, `backdrop-blur`, or emoji.

Not verified: visual rendering in a browser at mobile and desktop widths.

Pending owner (still `null`, per CONTENT.md): phone/WhatsApp, ₹ menu, hero photo, staff, review quotes.
