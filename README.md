# The Kohinoor AC Salon · Pimple Nilakh, Pune

A mobile-first site that helps customers find the salon and message its business Instagram. The cream-and-oxblood design takes its cues from shop signage. There are no accounts, embedded maps, analytics, or booking forms.

**Selected production address (older build currently live):** [kohinoorsalon.vercel.app](https://kohinoorsalon.vercel.app/)

## Start here

- [Shop owner handover](docs/OWNER-HANDOVER.md): what the site does, what to check, and how to request changes.
- [Business facts](docs/CONTENT.md): approved listing information and what stays unpublished.
- [Maintainer handbook](docs/MAINTAINERS.md): build, test, publish, and roll back.
- [Release plan](docs/RELEASE.md): launch scope and gates.

## Verify and build

Use Node.js 22, which is the CI baseline, or supported Node.js 24 LTS.

```sh
npm ci
npm run lint
npm run type-check
npm run build:cloudflare
npm test
```

Serve the generated `out-cloudflare/` directory to review locally. This is a build folder, not a live site. See the maintainer handbook before making a hosted preview or publishing. Older Kiro notes document the initial design; the current fact ledger and release plan govern what ships.
