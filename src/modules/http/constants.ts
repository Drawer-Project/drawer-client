import { cookieService } from "../cookie";

import type { RequestSubConfigMap } from "./types";
import { extractDomain } from "./utils";

const DRAWER_SERVER = extractDomain(import.meta.env.VITE_SERVER_URL);

const requestHeaderMap: RequestSubConfigMap = {
  [DRAWER_SERVER]: {
    Authorization: `Bearer ${cookieService.get("access-token")}`,
  },
};

export { requestHeaderMap };
