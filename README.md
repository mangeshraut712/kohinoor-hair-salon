# The Kohinoor AC Salon · Pimple Nilakh, Pune

Mobile-first small-business website and service board. Cream and oxblood shop-sign design, with direct directions and the salon’s Instagram. No accounts, analytics, booking backend or embedded maps.

## Verify and build

Use Node 22 or the supported Node 24 LTS release.

```sh
npm ci
npm run lint
npm run type-check
npm run build:cloudflare
npm test
```

Deploy only the tested `out-cloudflare/` directory to the existing Cloudflare Pages project. For a different HTTPS production origin, set `CLOUDFLARE_SITE_URL` to that origin for the build and tests. To verify a non-indexable preview export, run the build and tests with `KOHINOOR_PREVIEW=1`; use access protection separately if the preview must be private.

See [RELEASE.md](RELEASE.md) for release and maintenance gates, and [CONTENT.md](CONTENT.md) for business details. Older Kiro spec/evidence files document the initial design; the release plan and fact ledger describe what ships.
