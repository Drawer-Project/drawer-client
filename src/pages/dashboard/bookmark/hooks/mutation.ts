import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BookmarkCreationRequest, createbookmark } from "@/api/bookmark";
import { useToast } from "@/components/ui/use-toast";
import { queryKeys } from "@/query/query-key";

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (request: BookmarkCreationRequest) => createbookmark(request),
    onSuccess: (_, variables) => {
      const { user_id } = variables;
      toast({
        description: "Your message has been sent.",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.BOOKMARK(user_id),
      });
    },
    onError: error => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.stack,
      });
    },
  });

  return mutation;
};
