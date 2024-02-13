import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { useCreateBookmark } from "../hooks/mutation";
import type { BookmarkCreationSchemaType } from "../schema";
import { bookmarkCreationSchema } from "../schema";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cookieService } from "@/modules/cookie";

const BookmarkDiablog: React.FC = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<BookmarkCreationSchemaType>({
    resolver: zodResolver(bookmarkCreationSchema),
  });

  const createBookmarkMutation = useCreateBookmark();

  const onSubmit = (data: BookmarkCreationSchemaType) => {
    const request = {
      ...data,
      collectionId: null,
      uuid: cookieService.get("uuid") as string,
    };
    createBookmarkMutation.mutate(request);
    reset();
  };

  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>
        <Button variant="default">Add Bookmark</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Bookmark</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} id="bookmark">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Url
              </Label>
              <Input id="url" className="col-span-3" {...register("url")} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" className="col-span-3" {...register("title")} />
            </div>
          </div>
        </form>
        <DialogFooter>
          <DialogClose disabled={!isValid}>
            <Button type="submit" form="bookmark" disabled={!isValid}>
              Save Bookmark
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { BookmarkDiablog };
