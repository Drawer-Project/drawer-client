import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SignupForm } from "./form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const Signup: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mt-8">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {isComplete ? "Sign Up Complete" : "Sign Up"}
          </CardTitle>
          <CardDescription>
            {isComplete
              ? "Congratulations! Your account has been successfully created. "
              : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isComplete ? (
            <Button onClick={() => navigate("/login")}>Go to Login</Button>
          ) : (
            <SignupForm setSignup={setIsComplete} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { Signup };
