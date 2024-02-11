import { FileWarningIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center px-4 py-8">
      <FileWarningIcon className="h-24 w-24 text-gray-500 dark:text-gray-400 mb-8" />
      <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
        404 Not Found
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 mt-8"
        to="/dashboard/bookmark"
      >
        Return to Homepage
      </Link>
    </main>
  );
};

export { NotFound };
