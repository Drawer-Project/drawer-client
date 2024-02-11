import { cookieService } from "@/modules/cookie";

type User = {
  accessToken: string;
  uuid: string;
  email: string;
};

const initUser: User = {
  accessToken: "",
  uuid: "",
  email: "",
};

const PERIOD = 7;

const authStore = {
  saveUser: (user: User) => {
    Object.entries(user).forEach(([key, value]) => {
      const curDate = new Date();
      const exprDate = new Date();
      exprDate.setDate(curDate.getDate() + PERIOD);
      cookieService.set(key, value, {
        expires: exprDate,
      });
    });
  },

  getUser: () => {
    return Object.keys(initUser).reduce((acc, key) => {
      const value = cookieService.get(key)?.toString();
      acc[key as keyof User] = typeof value === "string" ? value : "";
      return acc;
    }, {} as User);
  },

  removeUser: () => {
    Object.keys(initUser).forEach(key => {
      cookieService.remove(key);
    });
  },

  getUuid: () => {
    return cookieService.get("uuid");
  },
};

export type { User };
export { authStore };
