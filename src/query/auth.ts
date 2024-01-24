import { useMutation } from "@tanstack/react-query";

import { login, signup } from "@/api/auth";

export const useLoginMutation = () => {
  return useMutation({ mutationFn: login });
};

export const useSignupMutation = () => {
  return useMutation({ mutationFn: signup });
};
