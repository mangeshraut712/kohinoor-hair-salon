# Implementation Tasks

- [ ] 1. Create `src/data/salon.ts` and `src/lib/whatsapp.ts` matching `CONTENT.md` with strict nullable fields for unconfirmed phone/WhatsApp/prices/photos.
- [ ] 2. Build Cream (`#FAF6EE`) + Oxblood (`#5A141E`) shop-sign typography and CSS theme tokens in `src/app/globals.css` and `src/app/layout.tsx`, including `HairSalon` JSON-LD and SEO metadata.
- [ ] 3. Implement `MastheadNav`, `HeroShopSign` (with one dedicated real owner photo slot), and `MobileActionDock` with prominent Call & Directions CTAs on mobile.
- [ ] 4. Implement `ServiceBoard` (readable Hair / Beard / Skin board without invented prices) and `OwnerAndCraft` (Sagar Kale / AC shop / Shivaji Chowk context).
- [ ] 5. Implement `InstagramShowcase` (`@the_kohinoor_salon` & `@sagar._7716` link/reel slots, zero copied media) and `ReviewsAndHours` (4.5/5 from 49 reviews + exact hours).
- [ ] 6. Implement `LocationAndDirections` (keyless Google Maps embed + Google/Apple Maps links) and `AppointmentInquiry` (Kashish-style easy WhatsApp/copy inquiry flow).
- [ ] 7. Add comprehensive `tests/` checks: data truthfulness audit (no fake phone/prices), static export route check (`out-cloudflare/index.html`, `robots.txt`, `sitemap.xml`), JSON-LD schema validation, internal anchor/link integrity, and basic HTML accessibility checks (landmarks, `h1`, image alt, no empty buttons/links).
- [ ] 8. Run `npm run lint`, `npm run type-check`, `npm test`, and `npm run build:cloudflare`, inspect rendered output, and record verification evidence in `.kiro/evidence/`.
