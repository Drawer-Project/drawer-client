import { UniversalCookieManager } from "./implement/UniversalCookieManager";
import type { CookieManager } from "./interface/CookieManager";

const cookieService: CookieManager = new UniversalCookieManager();

export { cookieService };
