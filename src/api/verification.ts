import { httpService } from "@/modules/http";

type CheckCollectionNameRequest = {
  collectionName: string;
};

type CheckCollectionNameResponse = {
  status: number;
  message: string;
};

/**
 * @todo
 * replact stringfied query param to `URLSearchParams` object
 */
export const checkCollectionName = (request: CheckCollectionNameRequest) => {
  return httpService.post<CheckCollectionNameResponse, void>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/check-duplicate-collection-name?name=${request.collectionName}`,
  );
};
