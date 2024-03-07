import { httpService } from "@/modules/http";

export type CreateBookmarkRequest = {
  collectionId: number | null;
  uuid: string;
  url: string;
  title: string;
};

export type CreateBookmarkResponse = {
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

export type DeleteBookmarkRequest = {
  uuid: string;
  bookmarkId: number;
};

export const createBookmark = (request: CreateBookmarkRequest) => {
  const baseObject = {
    url: request.url,
    title: request.title,
  };

  return httpService.post<CreateBookmarkResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.uuid}/bookmarks`,
    request.collectionId
      ? { ...baseObject, collectionId: request.collectionId }
      : baseObject,
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

export const deleteBookmark = (request: DeleteBookmarkRequest) => {
  return httpService.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.uuid}/bookmarks/${request.bookmarkId}`,
  );
};
