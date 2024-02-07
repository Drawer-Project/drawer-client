import { Navigate, Route, Routes } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./routes";
import { useAuth } from "./use-auth";

import { DashBoard } from "@/pages/dashboard";
import { Bookmark } from "@/pages/dashboard/bookmark/bookmark";
import { Login } from "@/pages/login";
import { NotFound } from "@/pages/notfound";
import { Signup } from "@/pages/signup";
import { useUser } from "@/query/use-user";

const RouterClient = () => {
  const { user } = useUser();

  // if (!user) return <Navigate to="/login" replace />;

  console.log("user in router", user);

  return (
    <Routes>
      {/* <Route
        element={<PublicRoute isAuthenticated={!!user} link="/dashboard" />}
      > */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* </Route> */}
      {/* <Route element={<PrivateRoute isAuthenticated={!!user} link="/login" />}> */}
      <Route path="/dashboard" element={<DashBoard />}>
        <Route index element={<Bookmark />} />
        <Route path="bookmark" element={<Bookmark />} />
      </Route>
      {/* </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { RouterClient as Router };
