import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';

export class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
    });
  }

  private async request<T>(
    method: string,
    url: string,
    data: unknown = null,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.request({
        method,
        url,
        data,
        ...config,
      });

      return response.data;
    } catch (error) {
      // console.log(error);
      console.log(error?.response?.data);
      return <T>false;
    }
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('GET', url, null, config);
  }

  async post<T>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  async patch<T>(url: string, data: unknown, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('DELETE', url, null, config);
  }
}
