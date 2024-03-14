import { DefaultBodyType, http, HttpResponse, PathParams } from "msw";
import { v4 as uuidv4 } from "uuid";

import { LoginRequest, LoginResponse } from "@/api/auth";
import { CreateBookmarkRequest } from "@/api/bookmark";
import {
  AddBookmarkToCollectionRequest,
  CreateCollectionRequest,
  ReadColletionRequest,
  UpdateCollectionRequest,
} from "@/api/collection";
import {
  bookmarkdb,
  collectiondb,
  createToken,
  deleteBookmark,
  deleteCollection,
  findBookmarkById,
  findCollectionById,
  userdb,
} from "@/mocks/utils";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const handlers = [
  // auth
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

  // bookmark
  http.post<PathParams, CreateBookmarkRequest>(
    `${serverUrl}/api/v1/users/:uuid/bookmarks`,
    async ({ request }) => {
      const { url, title, collectionId } = await request.json();

      const boookmark = {
        bookmarkId: bookmarkdb[bookmarkdb.length - 1].bookmarkId + 1,
        url,
        title,
      };

      bookmarkdb.push(boookmark);

      if (collectionId) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const collection = findCollectionById(collectionId);
        collection?.bookmarks?.push({
          bookmarkId: boookmark.bookmarkId,
          title,
          url,
        });
      }

      return HttpResponse.json({
        bookmarkId: boookmark.bookmarkId,
        collectionId,
        url,
        title,
      });
    },
  ),

  http.delete<PathParams>(
    `${serverUrl}/api/v1/users/:uuid/bookmarks/:bookmarkId`,
    async ({ params }) => {
      const { bookmarkId } = params;

      deleteBookmark(+bookmarkId);

      return HttpResponse.json({}, { status: 200 });
    },
  ),

  http.get<PathParams, DefaultBodyType>(
    `${serverUrl}/api/v1/users/:uuid/bookmarks`,
    () => {
      return HttpResponse.json({
        bookmarks: bookmarkdb,
      });
    },
  ),

  // collection
  http.post<PathParams, CreateCollectionRequest>(
    `${serverUrl}/api/v1/users/:uuid/collections`,
    async ({ request }) => {
      const { name, description } = await request.json();

      const collection = {
        collectionId: collectiondb[collectiondb.length - 1].collectionId + 1,
        name,
        description,
        bookmarks: [],
      };

      collectiondb.push(collection);

      return HttpResponse.json({}, { status: 201 });
    },
  ),

  http.post<PathParams, AddBookmarkToCollectionRequest>(
    `${serverUrl}/api/v1/users/:uuid/collections/:collectionId/bookmarks`,
    async ({ params, request }) => {
      const { collectionId } = params;
      const { bookmarkId } = await request.json();

      const collection = findCollectionById(+collectionId);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const bookmark = findBookmarkById(bookmarkId);

      if (bookmark) {
        collection?.bookmarks?.push(bookmark);
        return HttpResponse.json({}, { status: 200 });
      }

      return HttpResponse.json({}, { status: 400 });
    },
  ),

  http.get<PathParams, DefaultBodyType>(
    `${serverUrl}/api/v1/users/:uuid/collections`,
    () => {
      return HttpResponse.json({
        collections: collectiondb,
      });
    },
  ),

  http.get<PathParams, ReadColletionRequest>(
    `${serverUrl}/api/v1/users/:uuid/collections/:collectionId`,
    ({ params }) => {
      const { collectionId } = params;

      const collection = findCollectionById(+collectionId);

      return HttpResponse.json({
        ...collection,
      });
    },
  ),

  http.delete<PathParams>(
    `${serverUrl}/api/v1/users/:uuid/collections/:collectionId`,
    ({ params }) => {
      const { collectionId } = params;

      deleteCollection(+collectionId);

      return HttpResponse.json({}, { status: 200 });
    },
  ),

  http.put<PathParams, UpdateCollectionRequest>(
    `${serverUrl}/api/v1/users/:uuid/collections/:collectionId`,
    async ({ params, request }) => {
      const { collectionId } = params;
      const { name, description } = await request.json();

      const index = collectiondb.findIndex(
        c => c.collectionId === +collectionId,
      );

      if (index !== -1) {
        collectiondb[index] = {
          ...collectiondb[index],
          name,
          description,
        };

        return HttpResponse.json({}, { status: 200 });
      }

      return HttpResponse.json({}, { status: 400 });
    },
  ),

  http.delete<PathParams>(
    `${serverUrl}/api/v1/users/:uuid/collections/:collectionId/bookmarks/:bookmarkId`,
    ({ params }) => {
      const { collectionId, bookmarkId } = params;

      const collectionIndex = collectiondb.findIndex(
        c => c.collectionId === +collectionId,
      );

      if (collectionIndex !== -1) {
        const bookmarkIndex = collectiondb[
          collectionIndex
        ].bookmarks!.findIndex(b => b.bookmarkId === +bookmarkId);

        if (bookmarkIndex !== -1) {
          collectiondb[collectionIndex].bookmarks?.splice(bookmarkIndex, 1);
          return HttpResponse.json({}, { status: 200 });
        }
      }

      return HttpResponse.json({}, { status: 400 });
    },
  ),

  // verification
  http.post(
    `${serverUrl}/api/v1/check-duplicate-collection-name`,
    ({ request }) => {
      const url = new URL(request.url);

      const collectionName = url.searchParams.get("name");

      if (collectionName === "it") {
        return HttpResponse.json({}, { status: 409 });
      }

      return HttpResponse.json({}, { status: 200 });
    },
  ),
];
