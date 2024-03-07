export const createToken = () => Math.random().toString(36).substring(2, 11);

export const userdb: { [key: string]: { email: string } } = {};

export let bookmarkdb: Array<{
  bookmarkId: number;
  url: string;
  title: string;
}> = [
  {
    bookmarkId: 1,
    url: "https://reactrouter.com/en/main",
    title: "react router dom",
  },
  {
    bookmarkId: 2,
    url: "https://remix.run/",
    title: "remix",
  },
];

export let collectiondb: Array<{
  collectionId: number;
  name: string;
  description: string;
  bookmarks?: {
    bookmarkId: number;
    url: string;
    title: string;
  }[];
}> = [
  {
    collectionId: 1,
    name: "it",
    description: "ex title 1",
    bookmarks: [
      {
        bookmarkId: 1,
        url: "https://reactrouter.com/en/main",
        title: "react router dom",
      },
      {
        bookmarkId: 2,
        url: "https://remix.run/",
        title: "remix",
      },
    ],
  },
  {
    collectionId: 2,
    name: "game",
    description: "ex title 2",
    bookmarks: [],
  },
];

export const findCollectionById = (collectionId: number) => {
  return collectiondb.find(c => c.collectionId === collectionId);
};

export const findBookmarkById = (bookmarkId: number) => {
  return bookmarkdb.find(b => b.bookmarkId === bookmarkId);
};

export const deleteBookmark = (bookmarkId: number) => {
  bookmarkdb = bookmarkdb.filter(b => b.bookmarkId !== bookmarkId);
};

export const deleteCollection = (collectionId: number) => {
  collectiondb = collectiondb.filter(c => c.collectionId !== collectionId);
};
