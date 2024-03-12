import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { BaseError } from "../types";

import { UseMutationProps } from "./types";

import {
  LoginRequest,
  SignupRequest,
  login,
  signout,
  signup,
} from "@/api/auth";
import { toast } from "@/components/ui/use-toast";
import { queryKeys } from "@/hooks/quries/query-key";
import { authStore } from "@/store/auth-store";

interface UseLoginProps {
  onSuccess: () => void;
  onError: (errMsg: string) => void;
}

export const useLogin = ({ onSuccess, onError }: UseLoginProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<unknown, BaseError, LoginRequest>({
    mutationFn: login,
    onSuccess: data => {
      queryClient.setQueryData(queryKeys.USER(), data);
      onSuccess();
    },
    onError: err => {
      onError(err.response.data.detail);
    },
  });

  return { login: mutate };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    queryClient.setQueryData(queryKeys.USER(), null);
    authStore.removeToken();
    navigate("/auth/login");
  };

  return { logout };
};

export const useSignout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation<unknown, BaseError>({
    mutationFn: signout,
    onSuccess: () => {
      toast({
        description: "You have successfully withdrawn your membership.",
      });
      queryClient.setQueryData(queryKeys.USER(), null);
      authStore.removeToken();
      navigate("/auth/login");
    },
    onError: err => {
      toast({
        title: "Membership withdrawal failed.",
        description: err.response.data.detail,
      });
    },
  });

  return { signout: mutate };
};

export const useSignup = ({ onSuccess, onError }: UseMutationProps) => {
  const { mutate } = useMutation<unknown, BaseError, SignupRequest>({
    mutationFn: request => signup(request),
    onSuccess: () => onSuccess(),
    onError: err => onError(err.response.data.detail),
  });

  return { signup: mutate };
};
