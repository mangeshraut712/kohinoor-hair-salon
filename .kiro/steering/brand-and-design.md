# Brand & Design Direction — The Kohinoor AC Salon

## Visual Identity (Cream + Oxblood Shop-Sign Editorial)
- **Palette:**
  - Warm Cream Paper Ground: `#FAF6EE`
  - Parchment Ledger Surface: `#F2EADF`
  - Deep Oxblood Shop-Sign Ink / Primary Accent: `#5A141E` (hover `#420C14`, muted oxblood border `#7E2C36`)
  - Primary Body Ink: `#1E1715`
  - Secondary Muted Ink: `#574842`
  - Hairline Ledger Divider: `#D7CBB9`
  - Cream Text on Oxblood: `#FAF6EE`
- **Typography:**
  - Shop-sign display headings: classic editorial display serif (`Fraunces`, `Playfair Display`, `Georgia`, serif) with tight tracking and authoritative uppercase/title shop-sign framing.
  - Readable UI & service board body: clean humanist sans (`Plus Jakarta Sans`, `DM Sans`, system-ui, sans-serif).
  - Hours, coordinates, and price/status columns: crisp tabular numerals (`ui-monospace`, `SFMono-Regular`, monospace).
  - Load optional Google Fonts via non-blocking stylesheet `<link>` or CSS variables with rock-solid fallbacks so offline CI builds never fail.

## Anti-Slop Rules
- **NEVER** use charcoal + brass, purple gradients, neon accents, glassmorphism (`backdrop-blur`), or emoji icons (`✂️`, `💈`, `⭐`) in UI chrome.
- **NEVER** invent ₹ prices, fake client counts, fake testimonials, or stock barber photos.
- **NEVER** scrape or copy images from Google Maps or Instagram into `public/`.
- Keep elevation flat and architectural: crisp `1px` rules, generous whitespace, deliberate alignment, and print-shop-sign hierarchy.

## Core User Flows & Layout
1. **Mobile-first prominent Call & Directions:** A sticky mobile action bar (and prominent hero CTAs) keeping **Call / WhatsApp** and **Get Directions** one tap away. When `phone`/`whatsapp` is `null` (pending owner confirmation), show an honest `"Number pending — message @the_kohinoor_salon"` / inquiry jump rather than a dead or fake `tel:` link.
2. **Hero with One Dedicated Real Owner Photo Slot:** Split shop-sign masthead with one framed print-style hero photo slot (`aspect-[4/3]` or `aspect-[4/5]`) explicitly styled as an architectural shop-sign placeholder until Sagar supplies the real photo.
3. **Readable Service Board:** Classic Indian men's salon service board divided into `Hair & Cuts`, `Beard & Shave`, and `Skin & Grooming` (matching `@the_kohinoor_salon`'s `"Hair | Skin"` bio), clearly stating rates are confirmed at the shop / pending owner menu.
4. **Kashish-style Easy Contact & Appointment Flow:** Interactive client-side form (Name, Mobile Number, Service Interest, Preferred Day & Time Slot, Notes) that builds a pre-filled WhatsApp inquiry message (via `buildWhatsAppLink`) or copyable message summary when the WhatsApp number is pending.
5. **Owner, Instagram & Reviews:** Feature owner **Sagar Kale** (`@sagar._7716`), link cleanly to `@the_kohinoor_salon` reels/posts with an Instagram showcase slot (no stolen media), display the verified `4.5 / 5` (`49 Google reviews`) summary linking out to Google, and embed the keyless Google Map for `18.571585, 73.793096` alongside Google Maps & Apple Maps directions.
