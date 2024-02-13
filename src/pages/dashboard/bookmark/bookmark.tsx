import { SearchIcon } from "lucide-react";
import React from "react";

import { BookmarkDiablog } from "./components/dialog";
import { BookmarkList } from "./components/list";

import { Input } from "@/components/ui/input";

const Bookmark: React.FC = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        {/* <h1 className="font-semibold text-lg md:text-2xl">Products</h1> */}
        <form className="w-full">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search bookmarks..."
              type="search"
            />
          </div>
        </form>
        <BookmarkDiablog />
      </div>
      <div className="border shadow-sm rounded-lg">
        <BookmarkList />
      </div>
    </main>
  );
};

export { Bookmark };
