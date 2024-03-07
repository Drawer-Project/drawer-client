import { Loader } from "lucide-react";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { CollectionList } from "./collection-list";
import { CollectionTopBar } from "./collection-topbar";

import { PageError } from "@/components/ui/page-error";

const Collections: React.FC = () => {
  return (
    <main className="w-4/6 mx-auto flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <ErrorBoundary fallback={<PageError />}>
        <CollectionTopBar />
        <Suspense fallback={<Loader />}>
          <CollectionList />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export { Collections };
