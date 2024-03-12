import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

import { getDomainFromUrl } from "@/utils/url";

interface BookmarkCardProps {
  favicon?: string;
  url: string;
  title: string;
  children: ReactNode;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({
  url,
  title,
  children,
}) => {
  return (
    <Link
      className="border shadow-sm rounded-lg w-full px-4 py-2 hover:shadow-lg cursor-pointer"
      to={url}
    >
      <div className="flex justify-between gap-4 items-center">
        <span className="text-xl text-center font-semibold tracking-tight basis-72 shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">
          {getDomainFromUrl(url) || url}
        </span>
        <span className="text-lg leading-7 basis-[600px] w-[600px] flex-grow-0 whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </span>
        {children}
      </div>
    </Link>
  );
};

export { BookmarkCard };
