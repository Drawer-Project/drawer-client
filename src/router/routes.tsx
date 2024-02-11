import { PropsWithChildren } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { useUser } from "@/hooks/quries/use-user";
import { Auth } from "@/pages/auth";
import { Login } from "@/pages/auth/login";
import { Signup } from "@/pages/auth/signup";
import { DashBoard } from "@/pages/dashboard";
import { Bookmark } from "@/pages/dashboard/bookmark";
import { NotFound } from "@/pages/notfound";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useUser();

  if (!user?.uuid) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
};

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
        index: true,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashBoard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "bookmark",
        element: <Bookmark />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { routes };
