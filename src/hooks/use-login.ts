import {
  DefaultError,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { LoginRequest, login } from "@/api/auth";
import { queryKeys } from "@/hooks/quries/query-key";
import { User } from "@/store/auth-store";

interface UseLoginProps {
  onSuccess: () => void;
  onError: (errMsg: string) => void;
}

export const useLogin = ({ onSuccess, onError }: UseLoginProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<User, DefaultError, LoginRequest>({
    mutationFn: login,
    onSuccess: data => {
      queryClient.setQueryData(queryKeys.USER(), data);
      onSuccess();
    },
    onError: err => {
      onError(err.message);
    },
  });

  return { login: mutate };
};
