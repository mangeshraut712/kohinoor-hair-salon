# Maintainer handbook

## Maintain one source of truth

Check [the shop facts](CONTENT.md) before changing copy, metadata, or links. Edit `src/data/salon.ts` and only the affected components. Keep the supplied Maps pin and business Instagram. Remove outdated details rather than guessing. Check HTML, metadata, structured data, and exported assets for unapproved personal information, hours, rates, and photos.

## Build and test the exact revision

Use the [README commands](../README.md) from a clean checkout. The static export wraps Next.js output in `out-cloudflare/`; this folder is the only deployment artifact. Rebuild for each mode and run the export tests immediately after its build, because the build replaces that folder.

For a non-indexable preview:

```sh
KOHINOOR_PREVIEW=1 npm run build:cloudflare
KOHINOOR_PREVIEW=1 npm test
```

A preview build supplies `noindex` metadata and a Pages response-header rule; neither restricts access. For a hosted private preview, verify access protection as a signed-out visitor before sharing it. For production, leave `KOHINOOR_PREVIEW` unset and, if the approved origin is not the default, set `CLOUDFLARE_SITE_URL` to the same HTTPS origin for the build and tests. Verify the canonical link, robots file, sitemap, and structured-data URL agree with that origin.

| Gate | What it can verify | What remains separate |
| --- | --- | --- |
| Lint, types and static tests | Source checks, exported files and links, withheld-content checks, indexability settings | Runtime interaction and what the host actually serves |
| Automated browser checks | Layout, keyboard navigation, and automated accessibility checks at 320, 390, 768, 1024 and 1440 CSS pixels; consult the exact-head CI results for Windows Chromium, Linux Firefox and macOS WebKit | WebKit automation is not branded Safari; automated checks are not a complete accessibility review |
| Manual device checks | Real Safari, iPhone and Android: check focus in the mobile menu, sticky buttons at narrow and landscape sizes, and the exact Maps and Instagram destinations | No test message is sent or call placed; verify the displayed dialer number and record the actual devices and browsers tested |
| Live smoke check | Signed-out HTTPS on the approved hostname: home, static assets, a missing path, robots, sitemap and correct link destinations | Passing a local export or preview does not establish a successful production deployment |

## Publish and roll back

1. Follow the [release plan](RELEASE.md) and use the existing Pages project only. Confirm its production branch, build settings and access policy before merging or publishing: a Git-connected project can auto-deploy on push. Pin Node.js 22 to mirror CI. Never promote a `KOHINOOR_PREVIEW=1` artifact.
2. Publish the tested production export, verify the live smoke checks, and record its commit, hostname, deployment ID and previous healthy production ID. Keep a copy of that exact tested export. Do not announce a launch until these checks pass.
3. If the release breaks, roll back to the recorded healthy production deployment, then repeat the smoke checks and record the outcome. A preview is not a rollback target. For a first production launch, agree on a fallback before publishing because there may be no prior healthy deployment.

References: [Cloudflare preview access](https://developers.cloudflare.com/pages/configuration/preview-deployments/) · [Cloudflare Pages rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/).

Run the browser suite after a production export:

```sh
npx playwright install chromium firefox webkit
npm run test:browser
```

On Linux CI use `npx playwright install --with-deps <engine>` to include system libraries. The automation tests viewport sizes, not device-specific Maps app routing. Keep the manual device gate.

On macOS Safari, use Option+Tab to reach links with the browser’s default keyboard preference, or Tab when “Press Tab to highlight each item on a webpage” is enabled. See [Apple’s keyboard shortcut guide](https://support.apple.com/guide/safari/keyboard-and-other-shortcuts-cpsh003/mac).
