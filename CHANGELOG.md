# Changelog

All notable changes to `@bybrave/he2` are documented here.
This is a maintained fork of [`he`](https://github.com/mathiasbynens/he) by
Mathias Bynens, which has had no npm release since 2018.

## 2.0.0 — 2026-07-05

First `@bybrave/he2` release. Forked from `he@1.2.0`. The entity
encode/decode engine and its Unicode tables are **byte-for-byte identical** to
the original — only the module wrapper changed — so this is a drop-in
replacement (verified by golden tests against upstream).

### Added
- **Dual ESM + CommonJS.** `import { encode, decode } from '@bybrave/he2'` and
  `require('@bybrave/he2')` both work and return the same
  `{ version, encode, decode, escape, unescape }` shape. Addresses the largest
  upstream pain cluster — #64 (modular / ESM build, 👍17).
- **Bundled TypeScript types**, shipped in the published tarball and wired
  through `exports.types`, so no separate `@types/he` is needed.
- **This CHANGELOG** and documented build output (#76).
- CI on Node 18 / 20 / 22.

### Fixed
- Clean `npm audit` — zero runtime dependencies retained, no advisories (#86).
- Reproducible, published build artifact (`lib/he.js`) so consumers no longer
  need the upstream code-generation toolchain (#76).

### Unchanged (by design — documented, not "fixed")
- The HTML-spec-accurate encode/decode engine and full Unicode entity tables
  are preserved exactly; behaviour under all options
  (`strict`, `useNamedReferences`, `decimal`, `encodeEverything`,
  `isAttributeValue`, `allowUnsafeSymbols`) matches `he@1.2.0`.
- **Zero dependencies.**
- The `he` CLI is still provided (`npx he`), now ported to ESM.
