import { cookieService } from "../cookie";

import type { RequestSubConfigMap } from "./types";
import { extractDomain } from "./utils";

import { SERVER_URL } from "@/api/domain";

const DRAWER_SERVER = extractDomain(SERVER_URL);

const createRequestHeaders = (): RequestSubConfigMap => {
  return {
    [DRAWER_SERVER]: {
      Authorization: `Bearer ${cookieService.get("accessToken")}`,
    },
  };
};

export { createRequestHeaders };
