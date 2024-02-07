import { Route, Routes } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./routes";

import { DashBoard } from "@/pages/dashboard";
import { Bookmark } from "@/pages/dashboard/bookmark/bookmark";
import { Login } from "@/pages/login";
import { NotFound } from "@/pages/notfound";
import { Signup } from "@/pages/signup";
import { useUser } from "@/query/use-user";

export const RouterClient = () => {
  // const { isLoggedIn } = useAuth();
  const { data } = useUser();

  return (
    <Routes>
      <Route
        element={
          <PublicRoute isAuthenticated={!!data?.user_id} link="/dashboard" />
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route
        element={
          <PrivateRoute isAuthenticated={!!data?.user_id} link="/login" />
        }
      >
        <Route path="/dashboard" element={<DashBoard />}>
          <Route index element={<Bookmark />} />
          <Route index path="bookmark" element={<Bookmark />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
