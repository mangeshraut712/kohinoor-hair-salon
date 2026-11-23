# Kohinoor release plan

1. Requirements: one small, mobile-first site for the shop; customers can find the shop and message the business on Instagram. Use the supplied Maps pin and business account. No guessed contact details, hours or rates; no personal profile or unlicensed images.
2. Design: retain the cream-and-oxblood shop-sign design. Use an illustrative sign, readable service categories and sticky Directions / Call actions. No third-party embeds, backend, analytics or visitor form.
3. Implementation: keep the existing Next.js Cloudflare Pages export. Match canonical, robots and sitemap to the production origin. Make preview exports non-indexable; this is not access protection.
4. Verification: build exact candidate, lint, type-check, check HTML and all local asset references, check keyboard/mobile navigation and link destinations; no message is sent as part of QA.
5. Deployment: publish only to the existing Kohinoor Pages project, verify HTTPS and homepage/404/robots/sitemap at the actual hostname. Preserve a copy of the tested build and provider deployment ID.
6. Maintenance: update only verified hours, phone, rates and owner-authorized photographs. Re-run the same gates before deploying. After the first launch, record a prior healthy deployment ID for immediate rollback.
