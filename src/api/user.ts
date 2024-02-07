import { httpService } from "@/modules/http";

type ReadUserInfoRequest = {
  userId: string | number;
};

type ReadUserInfoResponse = {
  // accessToken: string;
  userId: string | number;
  email: string;
};

export const readUserInfo = (request: ReadUserInfoRequest) => {
  return httpService.get<ReadUserInfoResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.userId}`,
  );
};
