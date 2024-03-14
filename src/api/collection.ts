import { SERVER_URL } from "./domain";

import { httpService } from "@/modules/http";

export type CreateCollectionRequest = {
  uuid: string;
  name: string;
  description: string;
};

export type CreateCollectionRequestBody = Omit<CreateCollectionRequest, "uuid">;

export type CreateCollectionResponse = {
  collectionId: string;
  name: string;
  description: string;
};

export type ReadColletionRequest = {
  uuid: string;
  collectionId: string;
};

export type ReadCollectionResponse = {
  collectionId: string;
  name: string;
  description: string;
  bookmarks: Array<{
    bookmarkId: string;
    title: string;
    url: string;
  }>;
};

export type ReadColletionsRequest = {
  uuid: string;
};

export type ReadCollectionsResponse = {
  collections: Array<{
    collectionId: string;
    name: string;
    description: string;
  }>;
};

export type UpdateCollectionRequest = {
  uuid: string;
  collectionId: string;
  name: string;
  description: string;
};

export type UpdateCollectionRequestBody = Omit<
  UpdateCollectionRequest,
  "uuid" | "collectionId"
>;

export type UpdateCollectionResponse = {
  collectionId: string;
  name: string;
  description: string;
};

export type DeleteCollectionRequest = {
  uuid: string;
  collectionId: string;
};

export type AddBookmarkToCollectionRequest = {
  uuid: string;
  collectionId: string;
  bookmarkId: string;
};

export type AddBookmarkToCollectionBody = Omit<
  AddBookmarkToCollectionRequest,
  "uuid" | "collectionId"
>;

export type AddBookmarkToCollectionResponse = {
  collectionId: string;
  name: string;
  description: string;
  bookmark: {
    bookmarkId: string;
    title: string;
    url: string;
  };
};

export type RemoveBookmarkFromCollectionRequest = {
  uuid: string;
  collectionId: string;
  bookmarkId: string;
};

export const createCollection = (request: CreateCollectionRequest) => {
  return httpService.post<
    CreateCollectionResponse,
    CreateCollectionRequestBody
  >(
    `${SERVER_URL}/api/v1/users/${request.uuid}/collections`,
    {
      name: request.name,
      description: request.description,
    },
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const updateCollection = (request: UpdateCollectionRequest) => {
  return httpService.put<UpdateCollectionResponse, UpdateCollectionRequestBody>(
    `${SERVER_URL}/api/v1/users/${request.uuid}/collections/${request.collectionId}`,
    {
      name: request.name,
      description: request.description,
    },
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const deleteCollection = (request: DeleteCollectionRequest) => {
  return httpService.delete(
    `${SERVER_URL}/api/v1/users/${request.uuid}/collections/${request.collectionId}`,
  );
};

export const readCollection = (request: ReadColletionRequest) => {
  return httpService.get<ReadCollectionResponse>(
    `${SERVER_URL}/api/v1/users/${request.uuid}/collections/${request.collectionId}/bookmarks`,
  );
};

export const readCollections = (request: ReadColletionsRequest) => {
  return httpService.get<ReadCollectionsResponse>(
    `${SERVER_URL}/api/v1/users/${request.uuid}/collections`,
  );
};

export const addBookmarkToCollection = (
  request: AddBookmarkToCollectionRequest,
) => {
  return httpService.post<
    AddBookmarkToCollectionResponse,
    AddBookmarkToCollectionBody
  >(
    `${SERVER_URL}/api/v1/users/${request.uuid}/collections/${request.collectionId}/bookmarks`,
    {
      bookmarkId: request.bookmarkId,
    },
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const removeBookmarkFromCollection = (
  request: RemoveBookmarkFromCollectionRequest,
) => {
  return httpService.delete(
    `${SERVER_URL}/api/v1/users/${request.uuid}/collections/${request.collectionId}/bookmarks/${request.bookmarkId}`,
  );
};
