/* eslint-disable @typescript-eslint/no-explicit-any */
interface CookieManager {
  get: (key: string, options?: any) => string | undefined;
  getAll: (options?: any) => { [name: string]: any };
  set: <T>(key: string, value: T, options?: any) => void;
  remove: (key: string, options?: any) => void;
}

export type { CookieManager };
