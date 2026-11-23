<p align="center"><img src="public/brand/kohinoor-emblem.webp" width="112" height="112" alt=""></p>

<h1 align="center">The Kohinoor AC Salon</h1>

<p align="center" lang="mr">द कोहिनूर एसी सलून (पिंपळे निलख)</p>

<p align="center"><strong>Men’s haircuts, beard grooming, and skin care · Pimple Nilakh, Pune</strong></p>

<p align="center">
  <a href="https://kohinoor-hair-salon.pages.dev/"><strong>Salon website</strong></a> ·
  <a href="https://maps.app.goo.gl/141XQMZtooLVQQN29?g_st=ic">Directions</a> ·
  <a href="https://www.instagram.com/the_kohinoor_salon/">Instagram</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-171717?style=flat-square&amp;logo=nextdotjs" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript-5.9-234E7A?style=flat-square&amp;logo=typescript" alt="TypeScript 5.9">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-0F6474?style=flat-square&amp;logo=tailwindcss" alt="Tailwind CSS 4">
  <a href="https://github.com/mangeshraut712/kohinoor-hair-salon/actions/workflows/ci.yml"><img src="https://github.com/mangeshraut712/kohinoor-hair-salon/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI status on main"></a>
</p>

## Visit Kohinoor

Kohinoor is a men’s salon at Shivaji Chowk in Pimple Nilakh. The website makes the essentials easy to find on a phone: what the salon offers, when it’s open, where to go, and how to ask the shop about availability or prices.

| | Details |
| --- | --- |
| **Services** | Men’s haircuts and styling, beard and shave, skin and grooming |
| **Hours** | Sunday and Tuesday–Saturday, 7:30 AM–10:00 PM IST. **Monday closed.** |
| **Call** | +91 97640 48382. Voice calls only; WhatsApp is not listed. |
| **Address** | Shivaji Chowk, near Bhavani Sweet Home, Main Road Gavthan, Pimple Nilakh, Pimpri-Chinchwad, Pune 411027, Maharashtra |
| **Find us** | [Open the shop pin in Google Maps](https://maps.app.goo.gl/141XQMZtooLVQQN29?g_st=ic) |

### Women’s beauty services and professional training in Thergaon

Kashish Beauty Parlour & Training Center offers [women’s beauty services](https://mangeshraut712.github.io/kashishbeautyparlour/en/services/), including bridal makeup and hair styling, and [professional beauty classes](https://mangeshraut712.github.io/kashishbeautyparlour/en/training/). Contact Kashish for appointments or course enquiries. For men’s grooming in Pimple Nilakh, contact Kohinoor directly.

## What the site does

| Area | What’s in the repository |
| --- | --- |
| **Shop identity** | Editorial cover, the supplied scissor-K logo, the Marathi shop name, and hours shown in Pune time |
| **Service board** | Filterable hair, beard and grooming cards with locally hosted editorial WebP photographs. [Photography credits](docs/CONTENT.md) |
| **Instagram** | The salon’s official handle links directly to its cuts and grooming reels. |
| **Mobile shortcuts** | Directions and Call stay close at hand. Visitors can share the verified map pin or copy the link on supported browsers. The menu scrolls to each section and supports keyboard navigation. |
| **Local search** | Business name, address, hours and phone in structured data, plus a canonical URL, sitemap and robots file |
| **Privacy** | No customer account, embedded map, analytics, or booking form. Calling, Maps and Instagram open separately. |

> **Release status:** Production uses the Cloudflare Pages project `kohinoor-hair-salon`. Publish the tested static export with the command in [the release plan](docs/RELEASE.md).

## Run locally

Use Node.js 22, the CI baseline, or Node.js 24 LTS. No API keys or database are required.

```bash
git clone https://github.com/mangeshraut712/kohinoor-hair-salon.git
cd kohinoor-hair-salon
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000/).

### Verify a release

```bash
npm run lint
npm run type-check
npm run build
npm test
npm start
```

The build writes a static export to `out-cloudflare/`. The local release preview runs on [localhost:4173](http://localhost:4173/). The browser suite also checks mobile, tablet and desktop layouts in Chromium, Firefox and WebKit:

```bash
npx playwright install chromium firefox webkit
npm run test:browser
```

Stop the local release preview before starting the browser suite, which starts its own server on port 4173.

## Owner and maintainer docs

- [Shop owner handover](docs/OWNER-HANDOVER.md): what customers can do and how to request changes.
- [Business facts](docs/CONTENT.md): approved details and what stays unpublished.
- [Maintainer handbook](docs/MAINTAINERS.md): testing, hosting, and rollback.
- [Release plan](docs/RELEASE.md): checks to complete before publishing.
