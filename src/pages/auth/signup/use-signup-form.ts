import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";

import { signupSchema, SignupSchemaType } from "./schema";

import { useSignup } from "@/hooks/quries/auth";

interface useSignupFormProps {
  setSignup: Dispatch<SetStateAction<boolean>>;
}

export const useSignupForm = ({ setSignup }: useSignupFormProps) => {
  const { register, setError, clearErrors, handleSubmit, formState } =
    useForm<SignupSchemaType>({
      resolver: zodResolver(signupSchema),
    });

  const onError = (errMsg: string) => {
    setError("root.serverError", { message: errMsg });
  };

  const onSuccess = () => {
    setSignup(true);
  };

  const { signup } = useSignup({
    onError,
    onSuccess,
  });

  const requestSignup = () => {
    const onSubmit = (data: SignupSchemaType) => {
      signup({ email: data.email, password: data.password });
    };

    return handleSubmit(onSubmit);
  };

  useEffect(() => {
    clearErrors("root.serverError");
  }, [formState.isValidating]);

  return {
    register,
    formState,
    requestSignup,
  };
};
