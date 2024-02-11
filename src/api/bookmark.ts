import { httpService } from "@/modules/http";

export type BookmarkCreationRequest = {
  collectionId: number | null;
  uuid: string;
  url: string;
  title: string;
};

export type BookmarkCreationResponse = {
  bookmarkId: number;
  url: string;
  title: string;
};

export type ReadBookmarksRequest = {
  uuid: string;
};

export type ReadBookmarksResponse = {
  bookmarks: Array<{
    bookmarkId: number;
    url: string;
    title: string;
  }>;
};

export const createBookmark = (request: BookmarkCreationRequest) => {
  return httpService.post<BookmarkCreationResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.uuid}/bookmarks`,
    {
      url: request.url,
      title: request.title,
      collection_id: request.collectionId,
    },
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const readBookmarks = (request: ReadBookmarksRequest) => {
  return httpService.get<ReadBookmarksResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.uuid}/bookmarks`,
  );
};
