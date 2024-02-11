import { DefaultBodyType, http, HttpResponse, PathParams } from "msw";
import { v4 as uuidv4 } from "uuid";

import { LoginRequest, LoginResponse } from "@/api/auth";
import { ReadBookmarksResponse } from "@/api/bookmark";
import { bookmarkdb, createToken, userdb } from "@/mocks/utils";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const handlers = [
  http.post<PathParams, LoginRequest>(
    `${serverUrl}/api/v1/login`,
    async ({ request }) => {
      const { email } = await request.json();

      const uuid = uuidv4();
      const accessToken = createToken();

      return HttpResponse.json({
        email,
        uuid,
        accessToken,
      });
    },
  ),

  http.get<PathParams, LoginResponse>(
    `${serverUrl}/api/v1/users/:uuid`,
    async ({ params }) => {
      const { uuid } = params;

      const accessToken = createToken();
      const { email } = userdb[uuid as string];

      if (!email) {
        return HttpResponse.error();
      }

      return HttpResponse.json({
        email,
        uuid,
        accessToken,
      });
    },
  ),

  http.get<PathParams, DefaultBodyType, ReadBookmarksResponse>(
    `${serverUrl}/api/v1/users/:uuid/bookmarks`,
    () => {
      return HttpResponse.json({
        bookmarks: bookmarkdb,
      });
    },
  ),
];

// `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.uuid}/bookmarks`,
