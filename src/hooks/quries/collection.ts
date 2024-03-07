import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { queryKeys } from "./query-key";
import { UseMutationProps } from "./types";
import { useUser } from "./use-user";

import {
  AddBookmarkToCollectionRequest,
  CreateCollectionRequest,
  DeleteCollectionRequest,
  RemoveBookmarkFromCollectionRequest,
  UpdateCollectionRequest,
  addBookmarkToCollection,
  createCollection,
  deleteCollection,
  readCollection,
  readCollections,
  removeBookmarkFromCollection,
  updateCollection,
} from "@/api/collection";
import { useToast } from "@/components/ui/use-toast";

export const useCollections = () => {
  const { user } = useUser();

  /**
   * @Todo
   * 해당 쿼리가 사용될 때는 user가 존재한다는 것을 assert할 수 있어야 함
   */
  if (!user) {
    console.error("User cannot be null in this hook.");
  }

  const { data } = useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKeys.COLLECTIONS(),
    queryFn: () => readCollections({ uuid: user!.uuid }),
  });

  return { collections: data?.collections };
};

export const useCollection = (collectionId: number) => {
  const { user } = useUser();

  /**
   * @Todo
   * 해당 쿼리가 사용될 때는 user가 존재한다는 것을 assert할 수 있어야 함
   */
  if (!user) {
    console.error("User cannot be null in this hook.");
  }

  const { data } = useSuspenseQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: queryKeys.COLLECTION(collectionId),
    queryFn: () => readCollection({ uuid: user!.uuid, collectionId }),
  });

  return { collection: { ...data } };
};

export const useCreateCollection = ({
  onSuccess,
  onError,
}: UseMutationProps) => {
  const mutation = useMutation({
    mutationFn: (request: CreateCollectionRequest) => createCollection(request),
    onSuccess: () => onSuccess(),
    onError: err => onError(err.message),
  });

  return mutation;
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (request: DeleteCollectionRequest) => deleteCollection(request),
    onSuccess: () => {
      toast({
        description: "The bookmark has been successfully deleted.",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.COLLECTIONS(),
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

export const useEditCollection = ({ onSuccess, onError }: UseMutationProps) => {
  const mutation = useMutation({
    mutationFn: (request: UpdateCollectionRequest) => updateCollection(request),
    onSuccess: () => onSuccess(),
    onError: err => onError(err.message),
  });

  return mutation;
};

export const useAddBookmarkToCollection = ({
  onSuccess,
  onError,
}: UseMutationProps) => {
  const mutation = useMutation({
    mutationFn: (request: AddBookmarkToCollectionRequest) =>
      addBookmarkToCollection(request),
    onSuccess: () => onSuccess(),
    onError: err => onError(err.message),
  });

  return mutation;
};

export const useRemoveBookmarkFromCollection = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (request: RemoveBookmarkFromCollectionRequest) =>
      removeBookmarkFromCollection(request),
    onSuccess: () => {
      toast({
        description:
          "The bookmark has been successfully removed from collection.",
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.COLLECTIONS(),
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

export const usePrefetchCollection = (collectionId: number) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const prefetchHandler = () => {
    queryClient.prefetchQuery({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: queryKeys.COLLECTION(collectionId),
      queryFn: () =>
        readCollection({
          uuid: user!.uuid,
          collectionId,
        }),
    });
  };

  return { prefetchHandler };
};
