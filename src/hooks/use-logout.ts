import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { queryKeys } from "@/hooks/quries/query-key";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    queryClient.setQueryData(queryKeys.USER(), null);
    navigate("/auth/login");
  };

  return { logout };
};
