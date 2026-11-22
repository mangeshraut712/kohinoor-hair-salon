# The Kohinoor AC Salon — Pimple Nilakh, Pune

Static small-business website for **The Kohinoor AC Salon** (`@the_kohinoor_salon`), a men's hair and skin grooming shop at **Shivaji Chowk, near Bhavani Sweet Home, Sharda Colony, Pimple Nilakh, Pimpri-Chinchwad, Pune 411027**, owned by **Sagar Kale** (`@sagar._7716`).

## Design & Content Principles

- **Verified facts only:** Business details, address, hours, rating, and social links come exclusively from verified public listings (`CONTENT.md`). Unverified details (phone/WhatsApp number, exact ₹ service prices, staff roster, and shop photography) are explicitly tracked as `TODO-for-owner`.
- **Visual identity:** Cream (`#FAF6EE`) and oxblood (`#5A141E`) shop-sign typography, readable service board, prominent mobile Call & Directions actions, one dedicated hero slot for a real owner photo, and an appointment inquiry flow modeled on `mangeshraut712/kashishbeautyparlour`.
- **Static & fast:** Next.js static export (`output: 'export'`) outputting to `out-cloudflare/` for Cloudflare Pages preview hosting.

## Local Development & Verification

```bash
npm install
npm run lint
npm run type-check
npm test
npm run build:cloudflare
```

## Spec-Driven Workflow

Specifications, steering documents, and build tasks live under `.kiro/steering/` and `.kiro/specs/kohinoor-website/`.
