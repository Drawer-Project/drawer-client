import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { loginSchema, loginSchemaType } from "./schema";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/query/auth";
import { cn } from "@/utils/css";

const LoginForm: React.FC = () => {
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data: loginSchemaType) => {
    setIsSubmitting(true);
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/home");
      },
      onError: err => {
        console.error("Error during login mutation:", err);
        setError("root.serverError", { message: "로그인에 실패하였습니다." });
      },
      onSettled: () => {
        setIsSubmitting(false);
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
          <div className="flex items-center">
            <Label
              htmlFor="password"
              className={cn(errors.password && "text-destructive")}
            >
              password
            </Label>
            <Link className="ml-auto inline-block text-sm underline" to="#">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" {...register("password")} />
          <ErrorMessage message={errors.password?.message} />
        </div>
        <ErrorMessage message={errors.root?.serverError.message} />
        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
        <Button className="w-full" variant="outline">
          Login with Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?&nbsp;
        <Link className="underline" to="/signup">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export { LoginForm };
