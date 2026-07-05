// Компилируется в CI (npm run test-types).
import he, { encode, decode, escape, unescape, version } from '../index.js';

const a: string = encode('<a>', { useNamedReferences: true, decimal: false });
const b: string = decode('&copy;', { isAttributeValue: true, strict: false });
const c: string = escape('<>');
const d: string = unescape('&lt;');
const v: string = version;
const e: string = he.encode('x', { encodeEverything: true });

void [a, b, c, d, v, e];
