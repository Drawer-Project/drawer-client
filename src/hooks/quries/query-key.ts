const queryKeys = {
  USER: () => ["user"],
  BOOKMARK: () => ["bookmarks"],
};

const frezzedKeys = Object.freeze(queryKeys);

export { frezzedKeys as queryKeys };
