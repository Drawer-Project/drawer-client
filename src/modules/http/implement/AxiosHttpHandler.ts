import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

import { requestHeaderMap } from "../constants";
import type { HttpHandler } from "../interface/HttpHandler";
import type { RequestConfig } from "../types";
import { extractDomain, getRequestHeader, mergeObjects } from "../utils";

import { cookieService } from "@/modules/cookie";

type AxiosRequestConfigAdaptor = Partial<AxiosRequestConfig> & RequestConfig;

class AxiosHttpHandler implements HttpHandler {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
    this.setupAuthInterceptor();
  }

  /**
   * @Todo
   * 현재 access-token을 brower에 저장하는 과정을 직접 하드코딩한 상태임 아래와 같은 변경 고려중
   * - 서버측에서 Cookie를 직접 생성하여 전달 => 브라우저가 서버측의 쿠키를 자동으로 저장 및 요청 시 자동 삽입
   */
  private setupAuthInterceptor() {
    this.instance.interceptors.response.use(response => {
      const accessToken = response.data["access-token"];

      if (accessToken) {
        cookieService.set("access-token", accessToken);
      }

      return response.data;
    });
  }

  private async request<T, D = object>(
    method: Method,
    url: string,
    data?: D,
    config?: AxiosRequestConfigAdaptor,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.request<T>({
      method,
      url,
      data,
      ...this.getRequestConfig(url, config),
    });

    return response.data;
  }

  async get<T>(url: string, config?: AxiosRequestConfigAdaptor) {
    return this.request<T>("get", url, undefined, config);
  }

  async post<T, D = object>(
    url: string,
    data: D,
    config?: AxiosRequestConfigAdaptor,
  ) {
    return this.request<T, D>("post", url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfigAdaptor) {
    return this.request<T>("delete", url, undefined, config);
  }

  async put<T, D>(url: string, data: D, config?: AxiosRequestConfigAdaptor) {
    return this.request<T, D>("put", url, data, config);
  }

  async patch<T, D>(url: string, data: D, config?: AxiosRequestConfigAdaptor) {
    return this.request<T, D>("patch", url, data, config);
  }

  private getRequestConfig(
    url: string,
    config?: AxiosRequestConfigAdaptor,
  ): AxiosRequestConfig {
    const defaultConfig: AxiosRequestConfig = {
      headers: getRequestHeader(requestHeaderMap, extractDomain(url)),
    };

    return mergeObjects(defaultConfig, config);
  }
}

export { AxiosHttpHandler };
