import { cookieService } from "@/modules/cookie";

export type User = {
  accessToken: string;
  userId: string | number;
  email: string;
};

const initUser: User = {
  accessToken: "",
  userId: "",
  email: "",
};

export const authStorage = {
  saveUser: (user: User) => {
    console.log("call save users", user);

    Object.entries(user).forEach(([key, value]) => {
      cookieService.set(key, value);
    });
  },

  getUser: () => {
    return Object.keys(initUser).reduce((acc, key) => {
      const value = cookieService.get(key);
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
    return cookieService.get("userId");
  },
};
