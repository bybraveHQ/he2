export interface EncodeOptions {
  /** Use named character references (e.g. `&copy;`) where possible. */
  useNamedReferences?: boolean;
  /** Use decimal escapes instead of hexadecimal. */
  decimal?: boolean;
  /** Encode every symbol, including printable ASCII. */
  encodeEverything?: boolean;
  /** Throw on forbidden code points instead of encoding them. */
  strict?: boolean;
  /** Do not encode `<>"'&` (unsafe outside of a safe context). */
  allowUnsafeSymbols?: boolean;
}

export interface DecodeOptions {
  /** Decode as if in an attribute value context. */
  isAttributeValue?: boolean;
  /** Throw on malformed/ambiguous references instead of tolerating them. */
  strict?: boolean;
}

/** Encode text to HTML character references. */
export function encode(text: string, options?: EncodeOptions): string;
/** Decode HTML character references back to text. */
export function decode(html: string, options?: DecodeOptions): string;
/** Alias of `decode`. */
export function unescape(html: string, options?: DecodeOptions): string;
/** Escape only `&<>"'` and backtick for use in HTML. */
export function escape(text: string): string;

export const version: string;

declare const he: {
  version: string;
  encode: typeof encode;
  decode: typeof decode;
  escape: typeof escape;
  unescape: typeof decode;
};
export default he;
