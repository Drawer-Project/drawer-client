import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { queryKeys } from "./query-key";

import { readUserInfo } from "@/api/user";
import { cookieService } from "@/modules/cookie";
import { User, authStorage } from "@/utils/user";


export const useUser = () => {
  const userId = authStorage.getUuid();

  if (!userId) {
    return { user: null };
  }

  const { data: user } = useQuery({
    queryKey: queryKeys.USER(userId),
    queryFn: () => readUserInfo({ userId }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: authStorage.getUser,
  });

  useEffect(() => {
    if (!user) authStorage.removeUser();
    // else {
    //   authStorage.saveUser(user);
    // }
  }, [user]);

  return { user };
};
