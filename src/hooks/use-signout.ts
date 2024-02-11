import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { signout } from "@/api/auth";
import { toast } from "@/components/ui/use-toast";
import { queryKeys } from "@/hooks/quries/query-key";

export const useSignout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation<unknown, Error>({
    mutationFn: signout,
    onSuccess: () => {
      navigate("auth/login");
      queryClient.setQueryData(queryKeys.USER(), null);
    },
    onError: err => {
      toast({
        title: "회원탈퇴에 실패하였습니다.",
        description: err.message,
      });
    },
  });

  return { signout: mutate };
};
