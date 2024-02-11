import { Label } from "@radix-ui/react-label";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

import { useSignupForm } from "./use-signup-form.ts";

import { Button } from "@/components/ui/button.tsx";
import { ErrorMessage } from "@/components/ui/error-message.tsx";
import { Input } from "@/components/ui/input.tsx";
import { cn } from "@/utils/css.ts";

interface SignupFormProps {
  setSignup: Dispatch<SetStateAction<boolean>>;
}

const SignupForm: React.FC<SignupFormProps> = ({ setSignup }) => {
  // const {
  //   register,
  //   setError,
  //   clearErrors,
  //   handleSubmit,
  //   formState: { errors, isValidating },
  // } = useForm<signupSchemaType>({
  //   resolver: zodResolver(signupSchema),
  // });
  // const signupMutation = useSignupMutation();
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const onSubmit = (data: signupSchemaType) => {
  //   setIsSubmitting(true);
  //   signupMutation.mutate(data, {
  //     onSuccess: () => {
  //       setSignup(true);
  //     },
  //     onError: err => {
  //       console.error("Error during login mutation:", err);
  //       setError("root.serverError", { message: "로그인에 실패하였습니다." });
  //     },
  //     onSettled: () => {
  //       setIsSubmitting(true);
  //     },
  //   });
  // };

  // useEffect(() => {
  //   clearErrors("root.serverError");
  // }, [isValidating]);

  const {
    register,
    formState: { errors, isSubmitting },
    requestSignup,
  } = useSignupForm({ setSignup });

  return (
    <form onSubmit={requestSignup()}>
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
        <Link className="underline" to="/auth/login">
          Login
        </Link>
      </div>
    </form>
  );
};

export { SignupForm };
