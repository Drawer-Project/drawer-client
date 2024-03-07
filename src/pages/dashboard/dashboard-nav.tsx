import * as Accordion from "@radix-ui/react-accordion";
import {
  BookmarkIcon,
  ListTodoIcon,
  ChevronDown,
  HashIcon,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { useCollections } from "@/hooks/quries/collection";

type BaseCategory = {
  name: string;
  path: string;
};

type ParentCategory = BaseCategory & {
  icon: JSX.Element;
  type: "single" | "multiple";
  children?: Array<BaseCategory>;
};

type Category = Array<ParentCategory>;

const CATEGORIES: Category = [
  {
    name: "Bookmark",
    path: "/dashboard/bookmark",
    icon: <BookmarkIcon />,
    type: "single",
  },
  {
    name: "Collections",
    path: "/dashboard/collections",
    icon: <ListTodoIcon />,
    type: "multiple",
    children: [],
  },
];

type DashBoardCategory = {
  name: string;
  path: string;
  icon: JSX.Element;
  type: "single" | "multiple";
  children?: Array<{ name: string; path: string }>;
};

interface NavItemProps extends Omit<DashBoardCategory, "type"> {
  curPath: string;
}

const SingleTypeNavItem: React.FC<NavItemProps> = ({
  name,
  path,
  icon,
  curPath,
}) => {
  return (
    <Link
      className={`${curPath === path ? "bg-gray-100" : ""} flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
      to={path}
      key={path}
    >
      {icon}
      {name}
    </Link>
  );
};

const MultipleTypeNavItem: React.FC<NavItemProps> = ({
  name,
  path,
  icon,
  curPath,
  children,
}) => {
  return (
    <Accordion.Root type="multiple">
      <Accordion.Item value="item-1">
        <div
          className={`${curPath === path ? "bg-gray-100" : ""} flex justify-between rounded-lg`}
        >
          <Link
            to={"/dashboard/collections"}
            className={`flex justify-between items-center gap-3  px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
          >
            <div className="flex items-center gap-3">
              {icon}
              {name}
            </div>
          </Link>
          <Accordion.Trigger className="hover:bg-gray-100 rounded-full">
            <ChevronDown />
          </Accordion.Trigger>
        </div>
        {children?.map(({ name, path }) => (
          <Accordion.Content key={path}>
            <Link
              to={path}
              className={`${curPath === path ? "bg-gray-100" : ""} flex items-center gap-3 rounded-lg px-6 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
            >
              <HashIcon />
              {name}
            </Link>
          </Accordion.Content>
        ))}
      </Accordion.Item>
    </Accordion.Root>
  );
};

type Collection = {
  collectionId: number;
  name: string;
  description: string;
};

type CollectionsArray = Collection[] | undefined;

function createArrayOfObjects(
  collections: CollectionsArray,
): Array<BaseCategory> {
  if (!collections) {
    return [];
  }

  return collections.map(collection => {
    return {
      name: collection.name,
      path: `/dashboard/collections/${collection.collectionId}`,
    };
  });
}

const DashBoardNav: React.FC = () => {
  const { pathname } = useLocation();
  const { collections } = useCollections();

  CATEGORIES[1].children = createArrayOfObjects(collections);

  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      {CATEGORIES.map(({ type, ...rest }) => {
        return type === "single" ? (
          <SingleTypeNavItem curPath={pathname} {...rest} />
        ) : (
          <MultipleTypeNavItem curPath={pathname} {...rest} />
        );
      })}
    </nav>
  );
};

export { DashBoardNav };
