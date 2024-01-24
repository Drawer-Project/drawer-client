import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { signupSchema, signupSchemaType } from "./schema";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { useSignupMutation } from "@/query/auth";
import { cn } from "@/utils/css";

const SignupForm: React.FC<{
  setSignup: Dispatch<SetStateAction<boolean>>;
}> = ({ setSignup }) => {
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });
  const signupMutation = useSignupMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: signupSchemaType) => {
    setIsSubmitting(true);
    signupMutation.mutate(data, {
      onSuccess: () => {
        setSignup(true);
      },
      onError: err => {
        console.error("Error during login mutation:", err);
        setError("root.serverError", { message: "로그인에 실패하였습니다." });
      },
      onSettled: () => {
        setIsSubmitting(true);
      },
    });
  };

  useEffect(() => {
    clearErrors("root.serverError");
  }, [isValidating]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className={cn(errors.email && "text-destructive")}
          >
            email
          </Label>
          <Input
            id="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          <ErrorMessage message={errors.email?.message} />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className={cn(errors.password && "text-destructive")}
          >
            password
          </Label>
          <Input id="password" type="password" {...register("password")} />
          <ErrorMessage message={errors.password?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            {...register("confirmPassword")}
          />
          <ErrorMessage message={errors.confirmPassword?.message} />
        </div>
        <ErrorMessage message={errors.root?.serverError.message} />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </Button>
        <Button className="w-full" variant="outline">
          Sign Up with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Already have an account?&nbsp;
        <Link className="underline" to="/login">
          Login
        </Link>
      </div>
    </form>
  );
};

export { SignupForm };
