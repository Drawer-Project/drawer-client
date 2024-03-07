import React from "react";

import { CollectionCard } from "./collection-card";

import { EmptyItem } from "@/components/ui/empty-item";
import { useCollections } from "@/hooks/quries/collection";

const CollectionList: React.FC = () => {
  const { collections } = useCollections();

  const renderCollections = () => {
    if (collections.length === 0) {
      return (
        <div className="mt-[15%]">
          <EmptyItem name="collection" />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-4">
        {collections.map(collection => (
          <CollectionCard
            key={collection.collectionId}
            itemCount={0}
            {...collection}
          />
        ))}
      </div>
    );
  };

  return <>{renderCollections()}</>;
};

export { CollectionList };
