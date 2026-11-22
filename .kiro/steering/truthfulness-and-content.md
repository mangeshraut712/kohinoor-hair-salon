# Truthfulness & Content Rules

1. All business constants must live in `src/data/salon.ts` and match `CONTENT.md` line for line.
2. Any missing field (`phone`, `whatsapp`, exact `priceInr`, `staff`, `reviewQuotes`, `heroPhotoUrl`) must be typed as `null` or `TODO-for-owner` in `src/data/salon.ts` and handled gracefully in the UI without faking data.
3. Do not include `telephone` in `LocalBusiness`/`HairSalon` JSON-LD while `phone` is `null`. Only emit verified fields in schema.org JSON-LD.
4. Never commit `.env`, API keys, tokens, or `Co-authored-by` trailers.
