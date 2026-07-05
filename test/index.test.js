import { test } from 'node:test';
import assert from 'node:assert';
import he, { encode, decode, escape, unescape, version } from '../index.js';

test('version is a string', () => {
  assert.equal(typeof version, 'string');
  assert.equal(he.version, version);
});

test('escape', () => {
  assert.equal(escape('<img src="x">'), '&lt;img src=&quot;x&quot;&gt;');
  assert.equal(escape("a'b`c&d"), 'a&#x27;b&#x60;c&amp;d');
});

test('encode default (hex escapes for unsafe + non-ASCII)', () => {
  assert.equal(encode('<a> © ≠'), '&#x3C;a&#x3E; &#xA9; &#x2260;');
});

test('encode useNamedReferences', () => {
  assert.equal(
    encode('foo © bar ≠ baz 𝌆 qux', { useNamedReferences: true }),
    'foo &copy; bar &ne; baz &#x1D306; qux'
  );
});

test('encode decimal', () => {
  assert.equal(encode('©', { decimal: true }), '&#169;');
});

test('encode encodeEverything', () => {
  assert.equal(
    encode('foo', { encodeEverything: true }),
    '&#x66;&#x6F;&#x6F;'
  );
});

test('encode allowUnsafeSymbols', () => {
  assert.equal(
    encode('foo © bar', { allowUnsafeSymbols: true, useNamedReferences: true }),
    'foo &copy; bar'
  );
});

test('decode named / decimal / hex references', () => {
  assert.equal(decode('foo &copy; bar &ne; baz &#x1D306; qux'), 'foo © bar ≠ baz 𝌆 qux');
  assert.equal(decode('&#169;'), '©');
  assert.equal(decode('&#xA9;'), '©');
});

test('decode legacy reference without semicolon', () => {
  assert.equal(decode('&copy'), '©');
});

test('decode isAttributeValue keeps ambiguous &amp=', () => {
  assert.equal(decode('&lang;', { isAttributeValue: true }), '⟨');
  assert.equal(decode('&amp=', { isAttributeValue: true }), '&amp=');
});

test('decode strict throws on malformed reference', () => {
  assert.throws(() => decode('&#xZZ;', { strict: true }), /Parse error/);
});

test('encode strict throws on forbidden code point', () => {
  assert.throws(() => encode('\x01', { strict: true }), /Parse error/);
});

test('unescape is an alias of decode', () => {
  assert.equal(unescape('&lt;&gt;'), '<>');
  assert.equal(he.unescape, he.decode);
});

test('round-trips text with astral symbols', () => {
  const s = 'café ♥ 𝌆 ≠ ©';
  assert.equal(decode(encode(s)), s);
  assert.equal(decode(encode(s, { useNamedReferences: true })), s);
});

test('default export exposes the full API', () => {
  assert.equal(typeof he.encode, 'function');
  assert.equal(typeof he.decode, 'function');
  assert.equal(typeof he.escape, 'function');
  assert.equal(typeof he.unescape, 'function');
});
