type HeaderConfig = Record<string, string>;

type RequestSubConfigMap = Record<string, HeaderConfig>;

type RequestConfig = {
  params?: object;
  headers?: object;
  body?: object;
};

type HttpMethod = "get" | "post" | "delete" | "put" | "patch";

export type { RequestConfig, RequestSubConfigMap, HttpMethod, HeaderConfig };
