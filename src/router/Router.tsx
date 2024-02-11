import React from "react";
import { RouterProvider } from "react-router-dom";

import { routes } from "@/router/routes.tsx";

const Router: React.FC = () => {
  return <RouterProvider router={routes} />;
};

export { Router };
