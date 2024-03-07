import { SearchIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CollectionTopBar: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <h1 className="mt-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Collections
      </h1>
      <div className="flex items-center">
        <form className="w-full">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search collection..."
              type="search"
            />
          </div>
        </form>
        <Link
          to={"/modal/create/collections"}
          state={{ previousLocation: location }}
        >
          <Button>Add Bookmark</Button>
        </Link>
      </div>
    </>
  );
};

export { CollectionTopBar };
