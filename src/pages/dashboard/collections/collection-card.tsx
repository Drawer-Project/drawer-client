import React from "react";
import { Link } from "react-router-dom";

import { CollectionDropDown } from "./collection-dropdown";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CollectionCardProps {
  collectionId: string;
  name: string;
  description: string;
  itemCount: number;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  collectionId,
  name,
  description,
  itemCount,
}) => {
  return (
    <Card className="border shadow-sm rounded-lg w-full px-4 py-2 hover:shadow-lg">
      <CardHeader className="flex items-center justify-between flex-row">
        <Link to={`/dashboard/collections/${collectionId}`}>
          <CardTitle className="hover:underline hover:cursor-pointer">
            {name}
          </CardTitle>
        </Link>
        <CollectionDropDown collectionId={collectionId} />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-sm">{description} </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                {itemCount} Items
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CollectionCard };
