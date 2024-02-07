import { Navigate, Outlet } from "react-router-dom";

type AuthRoute = {
  isAuthenticated: boolean;
  link: string;
};

const PrivateRoute: React.FC<AuthRoute> = props => {
  const { isAuthenticated, link } = props;

  if (!isAuthenticated) {
    return <Navigate to={link} replace />;
  }

  return <Outlet />;
};

const PublicRoute: React.FC<AuthRoute> = props => {
  const { isAuthenticated, link } = props;

  if (isAuthenticated) {
    return <Navigate to={link} replace />;
  }

  return <Outlet />;
};

export { PrivateRoute, PublicRoute };
