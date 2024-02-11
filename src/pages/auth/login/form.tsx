import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { useLoginForm } from "@/pages/auth/login/use-login-form";
import { cn } from "@/utils/css";

const LoginForm: React.FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    requestLogin,
  } = useLoginForm();

  return (
    <form onSubmit={requestLogin()}>
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
        <Link className="underline" to="/auth/signup">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export { LoginForm };
