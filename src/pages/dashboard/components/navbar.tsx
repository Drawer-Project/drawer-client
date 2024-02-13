import { BookmarkIcon, ListTodoIcon } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const CATEGORIES = [
  {
    name: "Bookmark",
    path: "/dashboard/bookmark",
    icon: <BookmarkIcon />,
  },
  {
    name: "Todo",
    path: "/dashboard/todo",
    icon: <ListTodoIcon />,
  },
];

const NavBar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className="grid items-start px-4 text-sm font-medium">
      {CATEGORIES.map(({ name, path, icon }) => (
        <Link
          className={`${pathname === path ? "bg-gray-100" : ""} flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
          to={path}
          key={path}
        >
          {icon}
          {name}
        </Link>
      ))}
    </nav>
  );
};

export { NavBar };
