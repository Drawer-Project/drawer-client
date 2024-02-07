import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { readUserInfo } from "@/api/user";
import { cookieService } from "@/modules/cookie";

export const useAuth = () => {
  const uuid = cookieService.get("uuid");
  const [isLoggedIn, setIsLoggedIn] = useState(!!uuid);
  const navigate = useNavigate();

  const onFirstEntering = async () => {
    if (!uuid) {
      navigate("/login", { replace: true });
    }

    try {
      const { user_id } = await readUserInfo({ userId: uuid as string });
      cookieService.set("uuid", user_id);
      setIsLoggedIn(true);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    onFirstEntering();
  }, []);

  return { isLoggedIn };
};
