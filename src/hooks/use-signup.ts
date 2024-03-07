import { DefaultError, useMutation } from "@tanstack/react-query";

import { UseMutationProps } from "./quries/types";

import { SignupRequest, signup } from "@/api/auth";

export const useSignup = ({ onSuccess, onError }: UseMutationProps) => {
  const { mutate } = useMutation<unknown, DefaultError, SignupRequest>({
    mutationFn: request => signup(request),
    onSuccess: () => onSuccess(),
    onError: err => onError(err.message),
  });

  return { signup: mutate };
};
