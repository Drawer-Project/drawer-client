import { CircleSlash2 } from "lucide-react";
import React from "react";

interface EmptyItemProps {
  name: string;
}

const EmptyItem: React.FC<EmptyItemProps> = ({ name }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <CircleSlash2 size="48px" />
      <h2 className="mt-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
        No {name}s found
      </h2>
      <p>Add a new {name} to get started</p>
    </div>
  );
};

export { EmptyItem };
