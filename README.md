# @bybrave/he2

Maintained fork of [`he`](https://www.npmjs.com/package/he) — a robust HTML entity encoder/decoder with full Unicode support.

Same battle-tested, HTML-spec-compliant engine, now shipped as native **ESM + CommonJS** with **built-in TypeScript types**, **zero dependencies**, and the `he` CLI. Encode/decode output is **byte-for-byte identical** to `he@1.2.0`.

## Install

```sh
npm install @bybrave/he2
```

## Usage

```js
import he from '@bybrave/he2';
// or: import { encode, decode, escape, unescape } from '@bybrave/he2';

he.encode('foo © bar ≠ baz 𝌆 qux', { useNamedReferences: true });
// → 'foo &copy; bar &ne; baz &#x1D306; qux'

he.decode('foo &copy; bar &ne; baz &#x1D306; qux');
// → 'foo © bar ≠ baz 𝌆 qux'

he.escape('<img src="x">');
// → '&lt;img src=&quot;x&quot;&gt;'
```

CommonJS works too — `require` returns the same `{ encode, decode, escape, unescape, version }` object as the original:

```js
const he = require('@bybrave/he2');
```

### API

- `encode(text, options?)` — options: `useNamedReferences`, `decimal`, `encodeEverything`, `strict`, `allowUnsafeSymbols`.
- `decode(html, options?)` — options: `isAttributeValue`, `strict`.
- `escape(text)` — escapes only `&<>"'` and backtick.
- `unescape(html, options?)` — alias of `decode`.
- `version` — the underlying he version.

### CLI

```sh
he --escape '<img src="x">'
echo '&copy; &#x1D306;' | he --decode
```

## What's changed vs `he@1.2.0`

| Change | Detail |
|---|---|
| ESM + CommonJS | Ships native ESM with a CommonJS build via the `exports` map — `import` and `require` both work. The original was UMD only. |
| Built-in types | TypeScript types are bundled — no separate `@types/he` needed. |
| Zero dependencies | Same as the original (no runtime deps), now maintained. |
| Engine unchanged | The HTML-spec engine and generated Unicode tables are ported byte-for-byte; encode/decode/escape output matches `he@1.2.0` exactly. |

## Migration from `he`

Drop-in — replace the import:

```diff
- const he = require('he');
+ const he = require('@bybrave/he2');
```

All output is identical to `he@1.2.0`. Unlike `entities` or `html-entities`, this keeps the exact `he` API (`encode`/`decode`/`escape`/`unescape` with the same options), so no code changes are needed.

## Support

If this package saves you time, you can support maintenance:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-buy%20me%20a%20coffee-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/bybrave)
[![Bitcoin](https://img.shields.io/badge/Bitcoin-BTC-F7931A?logo=bitcoin&logoColor=white)](#support)

Bitcoin (BTC): `bc1q37557q5jpeaxqydzwvf3jgj7zhnfpn2td3q40q`

## License

MIT. Copyright © Mathias Bynens; fork © bybrave.
