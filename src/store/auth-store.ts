import { cookieService } from "@/modules/cookie";

const PERIOD = 7;

const authStore = {
  saveToken: (token: string) => {
    const curDate = new Date();
    const exprDate = new Date();
    exprDate.setDate(curDate.getDate() + PERIOD);
    cookieService.set("accessToken", token, {
      path: "/",
      expires: exprDate,
    });
  },

  removeToken: () => {
    cookieService.remove("accessToken", {
      path: "/",
    });
  },

  getToken: () => {
    return cookieService.get("accessToken");
  },
};

export { authStore };
