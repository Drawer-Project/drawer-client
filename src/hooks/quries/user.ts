import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { queryKeys } from "./query-key";

import {
  UpdateProfileImageRequest,
  readUserInfo,
  updateProfileImage,
} from "@/api/user";
import { useToast } from "@/components/ui/use-toast";
import { cookieService } from "@/modules/cookie";

type User = {
  uuid: string;
  email: string;
  profileImageUrl: string;
};

export const useUser = () => {
  const token = cookieService.get("accessToken");

  const fetcher = async (): Promise<User | null> => {
    try {
      if (token) {
        return await readUserInfo();
      }
    } catch (error) {
      return null;
    }

    return null;
  };

  // eslint-disable-next-line
  // @ts-ignore
  const { data: user } = useSuspenseQuery({
    queryKey: queryKeys.USER(),
    queryFn: fetcher,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  return {
    user,
  };
};

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useUser();

  const mutation = useMutation({
    mutationFn: (request: UpdateProfileImageRequest) =>
      updateProfileImage(request),
    onMutate: variables => {
      const newUser = {
        profileImageUrl: variables.profileImage,
        ...user,
      };

      queryClient.setQueryData(queryKeys.USER(), () => newUser);
    },
    onSuccess: data => {
      queryClient.setQueryData(queryKeys.USER(), () => data);
      window.location.replace("/");
      toast({
        description: "Your profile picture has been successfully changed.",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to change profile picture.",
      });
    },
  });

  return mutation;
};
