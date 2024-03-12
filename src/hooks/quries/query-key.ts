const queryKeys = {
  USER: () => ["user"],
  BOOKMARK: () => ["bookmarks"],
  DASHBOARD: () => ["dashbaord"],
  COLLECTIONS: () => ["collections"],
  COLLECTION: (collectionId: string) => ["collections", collectionId],
};

const frezzedKeys = Object.freeze(queryKeys);

export { frezzedKeys as queryKeys };
