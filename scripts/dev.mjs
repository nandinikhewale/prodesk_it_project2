import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import * as esbuild from 'esbuild';

const PORT = 3000;
const ROOT = join(process.cwd(), 'public');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.map': 'application/json',
};

const reloadClients = new Set();

const reloadPlugin = {
  name: 'reload',
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length > 0) return;
      for (const client of reloadClients) client.write('data: reload\n\n');
    });
  },
};

const ctx = await esbuild.context({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  outdir: 'public/assets',
  jsx: 'automatic',
  sourcemap: true,
define: {
  'process.env.NODE_ENV': '"development"',
  'process.env.VITE_SOCKET_URL': JSON.stringify(
    process.env.VITE_SOCKET_URL || ''
  ),
},
  banner: {
    js: "new EventSource('/__reload').onmessage = () => location.reload();",
  },
  plugins: [reloadPlugin],
});

await ctx.watch();

const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (pathname === '/__reload') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    reloadClients.add(res);
    req.on('close', () => reloadClients.delete(res));
    return;
  }

  const filePath = normalize(join(ROOT, pathname === '/' ? 'index.html' : pathname));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403).end();
    return;
  }

  try {
    const file = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': TYPES[extname(filePath)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(file);
  } catch {
    const html = await readFile(join(ROOT, 'index.html'));
    res.writeHead(200, { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-store' });
    res.end(html);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
