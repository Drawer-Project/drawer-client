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
import { usePrefetchCollection } from "@/hooks/quries/collection";

interface CollectionDropDown {
  collectionId: string;
}

const CollectionDropDown: React.FC<CollectionDropDown> = ({ collectionId }) => {
  const location = useLocation();
  const { prefetchHandler } = usePrefetchCollection(collectionId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link
          to={`/modal/delete/collections/${collectionId}`}
          state={{ previousLocation: location }}
        >
          <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link
          to={`/modal/edit/collections/${collectionId}`}
          state={{ previousLocation: location }}
          onMouseEnter={prefetchHandler}
        >
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { CollectionDropDown };
