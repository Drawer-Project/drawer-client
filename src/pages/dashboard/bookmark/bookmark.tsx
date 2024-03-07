import { Loader } from "lucide-react";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { BookmarkList } from "./components/bookmark-list.tsx";
import { BookmarkTopBar } from "./components/bookmark-topbar.tsx";

import { PageError } from "@/components/ui/page-error.tsx";

const Bookmark: React.FC = () => {
  return (
    <main className="w-4/6 mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <ErrorBoundary fallback={<PageError />}>
        <BookmarkTopBar />
        <Suspense fallback={<Loader />}>
          <BookmarkList />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export { Bookmark };
