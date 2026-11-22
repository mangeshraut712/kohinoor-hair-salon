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

## Pass 2: task 9 (PR #1 review findings)
- Fonts: `Fraunces` and `Plus_Jakarta_Sans` via `next/font/google` (`display: 'swap'`), wired to `--font-display` / `--font-body`.
- JSON-LD: `founder` removed.
- Service board and inquiry dropdown: only `Hair & Cuts`, `Beard & Shave`, `Skin & Grooming` (items Hair, Beard & Shave, Skin). No invented sub-items.
- Mobile menu closes on link click; dropdown capped at `max-h-[calc(100dvh-8.5rem)]` with scroll.
- Instagram cards hover `#FFFDF8`; added reel/photo embed slot note pending owner permission.
- `npm run lint`, `npm run type-check`, `npm run build:cloudflare`, `npm test` (13/13): all exit 0.

## Task 10: mobile overflow fix
- Hero title uses `clamp(2.15rem,9vw,4.5rem)`; masthead title is `text-base sm:text-lg md:text-xl` with `min-w-0`; Menu toggle is `shrink-0`.
- All section grids use `[&>*]:min-w-0`. A test in `tests/site.test.mjs` enforces this.
- lint, type-check, build:cloudflare and npm test pass. A real 390px `scrollWidth` check was not run (no browser in this session).
