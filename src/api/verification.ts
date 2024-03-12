import { httpService } from "@/modules/http";

export type CheckCollectionNameRequest = {
  userId: string;
  collectionName: string;
};

/**
 * @todo
 * replact stringfied query param to `URLSearchParams` object
 */
export const checkCollectionName = (request: CheckCollectionNameRequest) => {
  return httpService.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/users/${request.userId}/check-duplicate-collection-name?name=${request.collectionName}`,
  );
};
