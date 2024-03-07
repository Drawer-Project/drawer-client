const queryKeys = {
  USER: () => ["user"],
  BOOKMARK: () => ["bookmarks"],
  DASHBOARD: () => ["dashbaord"],
  COLLECTIONS: () => ["collections"],
  COLLECTION: (collectionId: number) => ["collections", collectionId],
};

const frezzedKeys = Object.freeze(queryKeys);

export { frezzedKeys as queryKeys };
