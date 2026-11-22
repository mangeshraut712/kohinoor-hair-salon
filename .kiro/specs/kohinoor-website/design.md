# Design Architecture — The Kohinoor AC Salon

## Data Model (`src/data/salon.ts`)
- `SALON_INFO`: Typed object mirroring `CONTENT.md` with nullable `phone` / `whatsapp` / `heroPhoto` so flipping from pending to live is a one-line edit for Mangesh/Sagar.
- `SERVICE_BOARD`: 3 curated grooming categories (`Hair & Cuts`, `Beard & Shave`, `Skin & Grooming`) grounded in `@the_kohinoor_salon`'s `"Hair | Skin"` focus, with honest `"Confirmed at shop"` rate slots.
- `HOURS_SCHEDULE`: Exact 7-day table with Monday half-day note.

## Component Architecture (`src/components/`)
- `MastheadNav`: Top editorial bar with shop name, section jump links, and Directions CTA.
- `HeroShopSign`: Split cream/oxblood masthead with `<h1>`, verified location/rating strip, Call/Directions/Book CTAs, and one dedicated `HeroPhotoSlot` framed for Sagar's real shop photo.
- `ServiceBoard`: Clean tabular barbershop rate board with category filter (`All`, `Hair & Cuts`, `Beard & Shave`, `Skin & Grooming`).
- `OwnerAndCraft`: Short grounded section on Sagar Kale (`@sagar._7716`), AC grooming comfort, and Pimple Nilakh neighborhood landmarks.
- `InstagramShowcase`: Clean link/embed slot pointing to `@the_kohinoor_salon` (reels/posts) and `@sagar._7716` without scraping or bundling Instagram images.
- `ReviewsAndHours`: Verified `4.5 / 5 (49 Google reviews)` block linking to Google + full 7-day opening hours ledger.
- `LocationAndDirections`: Embedded keyless Google Map (`18.571585, 73.793096`) + Google Maps & Apple Maps Directions buttons.
- `AppointmentInquiry`: Kashish-inspired easy contact form generating a pre-filled WhatsApp message (or copyable inquiry card when WhatsApp number is pending) + clear pending-number notice.
- `MobileActionDock`: Fixed bottom mobile bar prioritizing **Call / Inquire** and **Directions** on small viewports.
- `SalonFooter`: Clean shop footer with links, hours summary, and JSON-LD script injection in `layout.tsx`.
