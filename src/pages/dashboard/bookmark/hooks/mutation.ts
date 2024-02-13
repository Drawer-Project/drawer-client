import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BookmarkCreationRequest, createBookmark } from "@/api/bookmark";
import { useToast } from "@/components/ui/use-toast";
import { queryKeys } from "@/hooks/quries/query-key";

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (request: BookmarkCreationRequest) => createBookmark(request),
    onSuccess: () => {
      toast({
        description: "Your message has been sent.",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.BOOKMARK(),
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
