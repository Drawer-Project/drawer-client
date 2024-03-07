import { MoreHorizontalIcon } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRemoveBookmarkFromCollection } from "@/hooks/quries/collection";
import { useUser } from "@/hooks/quries/use-user";

interface BookmarkDropDownProps {
  bookmarkId: number;
  collectionId: number;
}

const BookmarkDropDown: React.FC<BookmarkDropDownProps> = ({
  bookmarkId,
  collectionId,
}) => {
  const { user } = useUser();
  const mutation = useRemoveBookmarkFromCollection();

  const handleRemove = () => {
    mutation.mutate({
      uuid: user!.uuid,
      bookmarkId,
      collectionId,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem className="cursor-pointer" onClick={handleRemove}>
          remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { BookmarkDropDown };
