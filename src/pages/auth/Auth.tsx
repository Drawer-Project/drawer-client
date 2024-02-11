import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "@/hooks/quries/use-user";

const Auth: React.FC = () => {
  const { user } = useUser();

  if (user?.uuid) return <Navigate to={"/dashboard/bookmark"} replace />;

  return (
    <>
      <Outlet />
    </>
  );
};

export { Auth };
