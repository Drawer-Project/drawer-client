import React from "react";

import { BookmarkCard } from "./bookmark-card";
import { BookmarkDropDown } from "./bookmark-dropdown";

import { EmptyItem } from "@/components/ui/empty-item";
import { useBookmarks } from "@/hooks/quries/bookmark";

const BookmarkList: React.FC = () => {
  const { bookmarks } = useBookmarks();

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
            <BookmarkDropDown bookmarkId={bookmarkId} />
          </BookmarkCard>
        ))}
      </div>
    );
  };

  return <>{renderBookmarks()}</>;
};

export { BookmarkList };
