import { ShieldAlert } from "lucide-react";
import React from "react";

const PageError: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <ShieldAlert size="48px" />
      <h2 className="mt-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
        Oops! Something wrong.
      </h2>
      <p>Please try again later.</p>
    </div>
  );
};

export { PageError };
