// CJS-бандл из ESM-исходника. Footer разворачивает default в module.exports,
// чтобы require('@bybrave/he2') отдавал объект { version, encode, decode, ... }
// напрямую — как оригинальный he.
import { build } from 'esbuild';

await build({
  entryPoints: ['index.js'],
  bundle: true,
  format: 'cjs',
  platform: 'neutral',
  target: 'es2018',
  outfile: 'dist/index.cjs',
  footer: {
    js: 'module.exports = module.exports.default;',
  },
});

console.log('built dist/index.cjs');
