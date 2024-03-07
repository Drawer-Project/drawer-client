import { useParams } from "react-router-dom";

import { useCollection } from "@/hooks/quries/collection";

export const CollectionInfo = () => {
  const { collectionId } = useParams();

  if (!collectionId) {
    throw new Error("collectionId cannot be undefined in this components");
  }

  const { collection } = useCollection(parseInt(collectionId));

  return (
    <div className="flex flex-col gap-3">
      <h1 className="mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {collection.name}
      </h1>
      <p className="font-medium">{collection.description}</p>
    </div>
  );
};
