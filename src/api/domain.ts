export const SERVER_URL = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_SERVER_URL
  : import.meta.env.VITE_LOCAL_SERVER_URL;
