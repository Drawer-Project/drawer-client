import { httpService } from "@/modules/http";

type ReadUserInfoRequest = {
  uuid: string | undefined;
};

type ReadUserInfoResponse = {
  accessToken: string;
  uuid: string;
  email: string;
};

export const readUserInfo = async (request: ReadUserInfoRequest) => {
  return httpService.get<ReadUserInfoResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.uuid}`,
  );
};
