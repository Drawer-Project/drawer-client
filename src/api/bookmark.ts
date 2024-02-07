import { httpService } from "@/modules/http";

export type BookmarkCreationRequest = {
  collection_id: string | null;
  user_id: string;
  url: string;
  title: string;
};

export type BookmarkCreationResponse = {
  bookmark_id: string;
  url: string;
  title: string;
};

export type ReadBookmarksRequest = {
  user_id: string;
};

export type ReadBookmarksResponse = {
  bookmarks: Array<{
    bookmark_id: string;
    url: string;
    title: string;
  }>;
};

export const createbookmark = (request: BookmarkCreationRequest) => {
  return httpService.post<BookmarkCreationResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.user_id}/bookmarks`,
    {
      url: request.url,
      title: request.title,
      collection_id: request.collection_id,
    },
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const readBookmarks = (request: ReadBookmarksRequest) => {
  return httpService.get<ReadBookmarksResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.user_id}/bookmarks`,
  );
};
