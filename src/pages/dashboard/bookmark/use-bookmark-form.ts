import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  AddBookmarkToCollectionSchemaType,
  BookmarkCreationSchemaType,
  addBookmarkToCollectionSchema,
  bookmarkCreationSchema,
} from "./schema";

import { FormProps } from "@/components/types";
import { toast, useToast } from "@/components/ui/use-toast";
import { useCreateBookmark } from "@/hooks/quries/bookmark";
import { useAddBookmarkToCollection } from "@/hooks/quries/collection";
import { queryKeys } from "@/hooks/quries/query-key";
import { useUser } from "@/hooks/quries/user";

export const useCreateBookmarkForm = ({ afterSubmit }: FormProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useUser();
  const form = useForm<BookmarkCreationSchemaType>({
    resolver: zodResolver(bookmarkCreationSchema),
  });

  const onError = (errMsg: string) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: errMsg,
    });
  };

  const onSuccess = () => {
    toast({
      description: "Your Bookmark has been created successfully.",
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.BOOKMARK(),
    });
  };

  const mutation = useCreateBookmark({
    onError,
    onSuccess,
  });

  const request = () => {
    const onSubmit = (data: BookmarkCreationSchemaType) => {
      /**
       * @todo
       * remove collectionId
       */
      const request = {
        ...data,
        collectionId: null,
        uuid: user!.uuid,
      };
      mutation.mutate(request);
      afterSubmit();
    };

    return form.handleSubmit(onSubmit);
  };

  return { form, request };
};

export const useAddBookmarkToCollectionForm = ({ afterSubmit }: FormProps) => {
  const { user } = useUser();
  const { bookmarkId } = useParams();

  if (!bookmarkId) {
    throw new Error("bookmark cannot be undefined in this hook.");
  }

  const form = useForm<AddBookmarkToCollectionSchemaType>({
    resolver: zodResolver(addBookmarkToCollectionSchema),
  });

  const onError = (errMsg: string) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: errMsg,
    });
  };

  const onSuccess = () => {
    toast({
      description: "The bookmark has been successfully added to collection.",
    });
  };

  const mutation = useAddBookmarkToCollection({
    onError,
    onSuccess,
  });

  const request = () => {
    const onSubmit = ({ collectionId }: AddBookmarkToCollectionSchemaType) => {
      mutation.mutate({
        uuid: user!.uuid,
        bookmarkId,
        collectionId,
      });
      afterSubmit();
    };

    return form.handleSubmit(onSubmit);
  };

  return { form, request };
};
