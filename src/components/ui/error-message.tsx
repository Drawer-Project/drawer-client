import * as React from "react";

import { cn } from "@/utils/css";

const ErrorMessage: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <>
      {message && (
        <p className={cn("text-sm font-medium text-destructive")}>{message}</p>
      )}
    </>
  );
};

export { ErrorMessage };
