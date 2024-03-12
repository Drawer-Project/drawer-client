import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { UseMutationProps } from "./types";

import {
  CreateBookmarkRequest,
  DeleteBookmarkRequest,
  createBookmark,
  deleteBookmark,
  readBookmarks,
} from "@/api/bookmark";
import { useToast } from "@/components/ui/use-toast";
import { queryKeys } from "@/hooks/quries/query-key";
import { useUser } from "@/hooks/quries/user";

export const useBookmarks = () => {
  const { user } = useUser();

  const { data } = useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKeys.BOOKMARK(),
    queryFn: () => readBookmarks({ uuid: user!.uuid }),
  });

  return { bookmarks: data?.bookmarks };
};

export const useCreateBookmark = ({ onSuccess, onError }: UseMutationProps) => {
  const mutation = useMutation({
    mutationFn: (request: CreateBookmarkRequest) => createBookmark(request),
    onSuccess: () => onSuccess(),
    onError: err => onError(err.message),
  });

  return mutation;
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (request: DeleteBookmarkRequest) => deleteBookmark(request),
    onSuccess: () => {
      toast({
        description: "The bookmark has been successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.BOOKMARK(),
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Bookmarks added to a collection cannot be deleted. Please remove the bookmark from your collection and delete it completely.",
      });
    },
  });

  return mutation;
};
