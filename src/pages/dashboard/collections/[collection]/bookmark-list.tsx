import React from "react";
import { useParams } from "react-router-dom";

import { BookmarkCard } from "../../bookmark/components/bookmark-card";

import { BookmarkDropDown } from "./bookmark-dropdown";

import { EmptyItem } from "@/components/ui/empty-item";
import { useCollection } from "@/hooks/quries/collection";

const BookmarkList: React.FC = () => {
  const { collectionId } = useParams();

  if (!collectionId) {
    throw new Error("collectionId cannot be undefined in this components");
  }

  const {
    collection: { bookmarks },
  } = useCollection(parseInt(collectionId));

  const renderBookmarks = () => {
    if (bookmarks.length === 0) {
      return (
        <div className="mt-[15%]">
          <EmptyItem name="bookmark" />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-5">
        {bookmarks.map(({ bookmarkId, ...restProps }) => (
          <BookmarkCard key={bookmarkId} {...restProps}>
            <BookmarkDropDown
              bookmarkId={bookmarkId}
              collectionId={parseInt(collectionId)}
            />
          </BookmarkCard>
        ))}
      </div>
    );
  };

  return <>{renderBookmarks()}</>;
};

export { BookmarkList };
