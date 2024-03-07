import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import {
  collectionCreationSchema,
  CollectionCreationSchemaType,
} from "./schema";

import { FormProps } from "@/components/types";
import { useToast } from "@/components/ui/use-toast";
import {
  useCollection,
  useCreateCollection,
  useDeleteCollection,
  useEditCollection,
} from "@/hooks/quries/collection";
import { queryKeys } from "@/hooks/quries/query-key";
import { useUser } from "@/hooks/quries/use-user";

export const useCreateCollectionForm = ({ afterSubmit }: FormProps) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useUser();
  const form = useForm<CollectionCreationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(collectionCreationSchema),
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
      description: "Your collection has been created successfully.",
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.COLLECTIONS(),
    });
  };

  const mutation = useCreateCollection({
    onError,
    onSuccess,
  });

  const request = () => {
    const onSubmit = (data: CollectionCreationSchemaType) => {
      mutation.mutate({ uuid: user!.uuid, ...data });
      afterSubmit();
    };

    return form.handleSubmit(onSubmit);
  };

  return {
    form,
    request,
  };
};

export const useEditCollectionForm = ({ afterSubmit }: FormProps) => {
  const queryClient = useQueryClient();
  const { collectionId } = useParams();
  const { collection } = useCollection(parseInt(collectionId as string));

  const { toast } = useToast();
  const { user } = useUser();
  const form = useForm<CollectionCreationSchemaType>({
    mode: "onChange",
    resolver: zodResolver(collectionCreationSchema),
    defaultValues: collection,
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
      description: "Your collection has been edited successfully.",
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.COLLECTIONS(),
    });
  };

  const mutation = useEditCollection({
    onError,
    onSuccess,
  });

  const request = () => {
    const onSubmit = (data: CollectionCreationSchemaType) => {
      mutation.mutate({
        uuid: user!.uuid,
        collectionId: parseInt(collectionId as string),
        ...data,
      });
      afterSubmit();
    };

    return form.handleSubmit(onSubmit);
  };

  return {
    form,
    request,
  };
};

export const useDeleteCollectionForm = ({ afterSubmit }: FormProps) => {
  const { user } = useUser();
  const deleteCollectionMutation = useDeleteCollection();

  const request = (collectionId: number) => {
    deleteCollectionMutation.mutate({
      uuid: user!.uuid,
      collectionId,
    });
    afterSubmit();
  };

  return { request };
};
