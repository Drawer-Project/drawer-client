import { httpService } from "@/modules/http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  uuid: string;
  profileImageUrl: string;
};

export type SignupRequest = {
  email: string;
  password: string;
};

export const signup = (request: SignupRequest) => {
  return httpService.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/signup`,
    request,
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const login = (request: LoginRequest) => {
  return httpService.post<LoginResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/login`,
    request,
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const signout = () => {
  return httpService.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/signout`);
};
