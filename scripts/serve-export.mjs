import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';

const root = resolve('out-cloudflare');
if (!existsSync(resolve(root, 'index.html'))) throw new Error('Run npm run build:cloudflare first.');
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript', '.xml': 'application/xml',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
};

createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  let file = resolve(root, `.${pathname}`);
  if (file !== root && !file.startsWith(root + sep)) { res.writeHead(404).end(); return; }
  if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
  const present = existsSync(file) && statSync(file).isFile();
  if (!present) file = resolve(root, '404.html');
  res.writeHead(present ? 200 : 404, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' });
  if (req.method === 'HEAD') { res.end(); return; }
  const body = createReadStream(file);
  body.on('error', () => res.destroy());
  body.pipe(res);
}).listen(4173, '127.0.0.1');
