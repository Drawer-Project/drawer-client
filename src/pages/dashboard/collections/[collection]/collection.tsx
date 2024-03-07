import { Loader } from "lucide-react";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { BookmarkList } from "./bookmark-list";
import { CollectionInfo } from "./collection-info";

import { PageError } from "@/components/ui/page-error";

const Collection: React.FC = () => {
  return (
    <main className="w-4/6 mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <ErrorBoundary fallback={<PageError />}>
        <Suspense fallback={<Loader />}>
          <CollectionInfo />
          <BookmarkList />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export { Collection };
