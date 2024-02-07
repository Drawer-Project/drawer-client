const queryKeys = {
  USER: (userId: string | number) => ["users", userId],
  BOOKMARK: (userId: string) => ["users", userId, "bookmarks"],
};

const frezzedKeys = Object.freeze(queryKeys);

export { frezzedKeys as queryKeys };
