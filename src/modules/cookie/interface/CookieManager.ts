interface CookieGetOptions {
  doNotParse?: boolean;
  doNotUpdate?: boolean;
}

interface CookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | "none" | "lax" | "strict";
  partitioned?: boolean;
}

interface CookieChangeOptions {
  name: string;
  value?: unknown;
  options?: CookieSetOptions;
}

interface CookieManager {
  get: (key: string, options?: CookieGetOptions) => string | undefined;
  getAll: (options?: CookieGetOptions) => { [name: string]: CookieGetOptions };
  set: <T>(key: string, value: T, options?: CookieSetOptions) => void;
  remove: (key: string, options?: CookieChangeOptions) => void;
}

export type { CookieManager };
