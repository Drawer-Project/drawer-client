import { MoreHorizontalIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBookmark } from "@/hooks/quries/bookmark";
import { useUser } from "@/hooks/quries/user";

interface BookmarkDropDownProps {
  bookmarkId: string;
}

const BookmarkDropDown: React.FC<BookmarkDropDownProps> = ({ bookmarkId }) => {
  const { user } = useUser();
  const location = useLocation();
  const deleteBookmarkMutation = useDeleteBookmark();

  const handleDelete = (bookmarkId: string) => {
    deleteBookmarkMutation.mutate({
      uuid: user!.uuid,
      bookmarkId,
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleDelete(bookmarkId)}
        >
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link
          to={`/modal/add/bookmarks/${bookmarkId}`}
          state={{ previousLocation: location }}
        >
          <DropdownMenuItem className="cursor-pointer">
            Add to collection
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { BookmarkDropDown };
