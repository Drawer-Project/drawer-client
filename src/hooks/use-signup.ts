import { DefaultError, useMutation } from "@tanstack/react-query";

import { SignupRequest, signup } from "@/api/auth";

interface UseSignupProps {
  onSuccess: () => void;
  onError: (errMsg: string) => void;
}

export const useSignup = ({ onSuccess, onError }: UseSignupProps) => {
  const { mutate } = useMutation<unknown, DefaultError, SignupRequest>({
    mutationFn: request => signup(request),
    onSuccess: () => {
      onSuccess();
    },
    onError: err => {
      onError(err.message);
    },
  });

  return { signup: mutate };
};
