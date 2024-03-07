import { useLocation, useNavigate } from "react-router-dom";

export const useDialog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = location.state?.previousLocation;

  const handleClose = () => {
    navigate(previousLocation.pathname);
  };

  return { handleClose };
};
