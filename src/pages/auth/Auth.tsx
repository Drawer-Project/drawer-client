import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@/hooks/quries/user";

const Auth: React.FC = () => {
  const { user } = useUser();

  if (user) return <Navigate to="/dashboard/bookmark" replace />;

  return (
    <>
      <Outlet />
    </>
  );
};

export { Auth };
