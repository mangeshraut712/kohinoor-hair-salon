import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import net from 'node:net';

const origin = 'http://127.0.0.1:4173';

function portInUse(port) {
  return new Promise((done) => {
    const socket = net.connect(port, '127.0.0.1');
    socket.once('connect', () => {
      socket.end();
      done(true);
    });
    socket.once('error', () => done(false));
  });
}

async function waitForServer() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      if ((await fetch(`${origin}/`, { method: 'HEAD' })).status === 200) return;
    } catch {
      // The preview server is not accepting connections yet.
    }
    await new Promise((done) => setTimeout(done, 100));
  }
  throw new Error('serve-export.mjs did not start on 127.0.0.1:4173');
}

test('serve-export keeps requests inside out-cloudflare', async (t) => {
  if (await portInUse(4173)) {
    t.skip('another preview server already owns port 4173');
    return;
  }
  const cwd = mkdtempSync(join(tmpdir(), 'kohinoor-serve-'));
  const root = join(cwd, 'out-cloudflare');
  mkdirSync(root);
  writeFileSync(join(cwd, 'secret.txt'), 'outside-the-export');
  writeFileSync(join(root, 'index.html'), '<h1>export home</h1>');
  writeFileSync(join(root, '404.html'), '<h1>export not found</h1>');
  const server = spawn(process.execPath, [resolve('scripts/serve-export.mjs')], { cwd, stdio: 'ignore' });
  t.after(() => {
    server.kill();
    rmSync(cwd, { recursive: true, force: true });
  });
  await waitForServer();

  const home = await fetch(`${origin}/`);
  assert.equal(home.status, 200);
  assert.match(home.headers.get('content-type') ?? '', /^text\/html/);
  assert.match(await home.text(), /export home/);

  const missing = await fetch(`${origin}/no-such-page`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /export not found/);

  const traversal = await fetch(`${origin}/..%2fsecret.txt`);
  assert.equal(traversal.status, 404);
  assert.doesNotMatch(await traversal.text(), /outside-the-export/);

  const post = await fetch(`${origin}/`, { method: 'POST' });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get('allow'), 'GET, HEAD');
});
