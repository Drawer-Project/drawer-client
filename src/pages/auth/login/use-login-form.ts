import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useLogin } from "@/hooks/quries/auth";
import { loginSchema, loginSchemaType } from "@/pages/auth/login/schema";

export const useLoginForm = () => {
  const { register, setError, clearErrors, handleSubmit, formState } =
    useForm<loginSchemaType>({
      resolver: zodResolver(loginSchema),
    });

  const navigate = useNavigate();

  const onError = (errMsg: string) => {
    setError("root.serverError", { message: errMsg });
  };

  const onSuccess = () => {
    navigate("/dashboard/bookmark");
  };

  const { login } = useLogin({
    onError,
    onSuccess,
  });

  const requestLogin = () => {
    const onSubmit = (data: loginSchemaType) => {
      login({ email: data.email, password: data.password });
    };

    return handleSubmit(onSubmit);
  };

  useEffect(() => {
    clearErrors("root.serverError");
  }, [formState.isValidating]);

  return {
    register,
    formState,
    requestLogin,
  };
};
