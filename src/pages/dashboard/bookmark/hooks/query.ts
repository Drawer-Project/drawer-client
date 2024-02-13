import { useQuery } from "@tanstack/react-query";

import { readBookmarks } from "@/api/bookmark";
import { queryKeys } from "@/hooks/quries/query-key";
import { useUser } from "@/hooks/quries/use-user";

export const useBookmarks = () => {
  const { user } = useUser();

  if (!user?.uuid) return { bookmarks: [] };

  const { data } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKeys.BOOKMARK(),
    queryFn: () => readBookmarks({ uuid: user.uuid }),
  });

  return { bookmarks: data?.bookmarks };
};
