import { useQuery } from "@tanstack/react-query";

import { ReadBookmarksRequest, readBookmarks } from "@/api/bookmark";
import { queryKeys } from "@/query/query-key";

export const useBookmarks = (request: ReadBookmarksRequest) => {
  const { user_id } = request;

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKeys.BOOKMARK(user_id),
    queryFn: () => readBookmarks(request),
  });
};
