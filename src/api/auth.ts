import { httpService } from "@/modules/http";

type LoginRequest = {
  email: string;
  password: string;
};

type SignupRequest = {
  email: string;
  password: string;
};

export const signup = (request: SignupRequest) => {
  return httpService.post(
    `${import.meta.env.VITE_SERVER_URL}/api/signup`,
    request,
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const login = (request: LoginRequest) => {
  return httpService.post(
    `${import.meta.env.VITE_SERVER_URL}/api/login`,
    request,
    {
      headers: { "content-type": "application/json" },
    },
  );
};
