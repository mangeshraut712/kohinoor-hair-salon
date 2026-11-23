import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

for (const [label, config] of [['missing', undefined], ['malformed', '{']]) {
  test(`build gives a clear error for ${label} origin configuration`, () => {
    const root = mkdtempSync(join(tmpdir(), 'kohinoor-origin-'));
    try {
      mkdirSync(join(root, 'scripts'));
      mkdirSync(join(root, 'src', 'data'), { recursive: true });
      const entry = join(root, 'scripts', 'build-cloudflare.mjs');
      copyFileSync(new URL('../scripts/build-cloudflare.mjs', import.meta.url), entry);
      if (config !== undefined) writeFileSync(join(root, 'src', 'data', 'site-origin.json'), config);
      const result = spawnSync(process.execPath, [entry], { cwd: root, encoding: 'utf8' });
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Could not read production origin from src\/data\/site-origin\.json\./);
      assert.doesNotMatch(result.stderr, /SyntaxError|\n\s+at /);
    } finally {
      rmSync(root, { force: true, recursive: true });
    }
  });
}
