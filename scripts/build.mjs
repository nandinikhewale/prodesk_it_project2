import { cpSync, rmSync } from 'node:fs';
import * as esbuild from 'esbuild';

rmSync('dist', { recursive: true, force: true });

cpSync('public', 'dist', {
  recursive: true,
  filter: (source) => !source.includes('assets'),
});

await esbuild.build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  outdir: 'dist/assets',
  jsx: 'automatic',
  minify: true,
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.VITE_SOCKET_URL': JSON.stringify(process.env.VITE_SOCKET_URL || ''),
  },
});

console.log('Build finished in ./dist');
