import { cookieService } from "../cookie";

import type { RequestSubConfigMap } from "./types";
import { extractDomain } from "./utils";

const DRAWER_SERVER = extractDomain(import.meta.env.VITE_SERVER_URL);

const createRequestHeaders = (): RequestSubConfigMap => {
  return {
    [DRAWER_SERVER]: {
      Authorization: `Bearer ${cookieService.get("accessToken")}`,
    },
  };
};

export { createRequestHeaders };
