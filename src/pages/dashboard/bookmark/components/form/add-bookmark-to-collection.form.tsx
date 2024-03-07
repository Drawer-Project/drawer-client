import React from "react";
import { Controller } from "react-hook-form";

import { useAddBookmarkToCollectionForm } from "../../use-bookmark-form";

import { FormProps } from "@/components/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCollections } from "@/hooks/quries/collection";

const AddBookmarkToCollectionForm: React.FC<FormProps> = ({ afterSubmit }) => {
  const { form, request } = useAddBookmarkToCollectionForm({ afterSubmit });
  const { collections } = useCollections();

  return (
    <form
      onSubmit={request()}
      id="add-bookmark-to-collection"
      className="flex flex-row gap-2"
    >
      <Controller
        control={form.control}
        name="collectionId"
        render={({ field }) => (
          <Select onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a collection" />
            </SelectTrigger>
            <SelectContent>
              {collections?.map(({ collectionId, name }) => (
                <SelectItem key={collectionId} value={collectionId.toString()}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Button
        type="submit"
        form="add-bookmark-to-collection"
        disabled={!form.formState.isValid}
      >
        Save to collection
      </Button>
    </form>
  );
};

export { AddBookmarkToCollectionForm };
