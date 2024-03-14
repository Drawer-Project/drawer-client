import { SERVER_URL } from "./domain";

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
  return httpService.post(`${SERVER_URL}/api/v1/signup`, request, {
    headers: { "content-type": "application/json" },
  });
};

export const login = (request: LoginRequest) => {
  return httpService.post<LoginResponse>(
    `${SERVER_URL}/api/v1/login`,
    request,
    {
      headers: { "content-type": "application/json" },
    },
  );
};

export const signout = () => {
  return httpService.post(`${SERVER_URL}/api/v1/signout`);
};
