import { cpSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectRoot = process.cwd();
const cloudflareOutput = join(projectRoot, 'out-cloudflare');
const requestedUrl = process.env.CLOUDFLARE_SITE_URL || 'https://kohinoor-hair-salon.pages.dev';

let siteUrl;
try {
  siteUrl = new URL(requestedUrl);
} catch {
  console.error('CLOUDFLARE_SITE_URL must be a valid HTTPS origin.');
  process.exit(1);
}

if (siteUrl.protocol !== 'https:' || siteUrl.pathname !== '/' || siteUrl.search || siteUrl.hash) {
  console.error('CLOUDFLARE_SITE_URL must be an HTTPS origin with no path, query, or fragment.');
  process.exit(1);
}

if (existsSync(cloudflareOutput)) {
  rmSync(cloudflareOutput, { recursive: true, force: true });
}

const nextBin = join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');
if (!existsSync(nextBin)) {
  console.error('Missing local Next.js binary. Run npm install first.');
  process.exit(1);
}

const build = spawnSync(process.execPath, [nextBin, 'build'], {
  cwd: projectRoot,
  env: {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: siteUrl.origin,
  },
  stdio: 'inherit',
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

cpSync(join(projectRoot, 'out'), cloudflareOutput, { recursive: true });
console.log(`Prepared Cloudflare Pages artifact in ${cloudflareOutput}`);
