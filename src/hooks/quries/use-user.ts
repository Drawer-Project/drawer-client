import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { queryKeys } from "./query-key";

import { readUserInfo } from "@/api/user";
import { User, authStore } from "@/store/auth-store";

export const useUser = () => {
  // eslint-disable-next-line
  // @ts-ignore
  const { data: user } = useQuery({
    // eslint-disable-next-line
    queryKey: queryKeys.USER(),
    queryFn: async (): Promise<User | null> =>
      readUserInfo({ uuid: user?.uuid }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: authStore.getUser,
  });

  useEffect(() => {
    if (!user) authStore.removeUser();
    else authStore.saveUser(user);
  }, [user]);

  return {
    user: user ?? null,
  };
};
