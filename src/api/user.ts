import { httpService } from "@/modules/http";

export type ReadUserInfoResponse = {
  uuid: string;
  email: string;
  profileImageUrl: string;
};

export type UpdateProfileImageRequest = {
  uuid: string;
  profileImage: FormData;
};

/**
 * The token information stored in the browser cookie is sent
 * to the server to read user information. Therefore, when calling
 * a function, specific parameters are not passed as parameters.
 *
 * In order to check the specific process please check the 'http' module.
 */
export const readUserInfo = async () => {
  return httpService.get<ReadUserInfoResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users`,
  );
};

export const updateProfileImage = async (
  request: UpdateProfileImageRequest,
) => {
  return httpService.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.uuid}`,
    request.profileImage,
  );
};
