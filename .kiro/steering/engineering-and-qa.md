# Engineering & QA Standards

- **Framework:** Next.js App Router with `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.
- **Single PR / Branch Policy:** Keep implementation on the single feature branch (`feat/kohinoor-salon-site`). Do not open competing branches or duplicate PRs. Dot owns final design/QA review on the PR.
- **Accessibility (WCAG 2.1 AA):**
  - Skip-to-content link (`#main-content`)
  - Single `<h1>` per page, logical heading order (`h1` -> `h2` -> `h3`)
  - Visible focus outlines (`focus-visible:outline-2 focus-visible:outline-offset-2`)
  - Contrast >= 4.5:1 for normal text (`#1E1715` on `#FAF6EE` is ~15.8:1; `#FAF6EE` on `#5A141E` is ~11.2:1)
  - Proper `aria-label`s on icon-only controls, external link `rel="noopener noreferrer"`, and `title` on map `<iframe>`.
- **Verification Gate (must pass before every commit/PR update):**
  - `npm run lint`
  - `npm run type-check`
  - `npm test` (validates `src/data/salon.ts` truthfulness, static export output in `out-cloudflare/`, `sitemap.xml`, `robots.txt`, valid JSON-LD, internal anchor/link targets, and zero invented/placeholder contact leaks)
  - `npm run build:cloudflare`
