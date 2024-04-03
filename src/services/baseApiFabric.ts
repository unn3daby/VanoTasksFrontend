import { API } from 'src/models/APIModel';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosMethods {
  get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  post(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse>;
  put(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse>;
  patch(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse>;
  delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
}

const httpMethods: { [key: string]: keyof AxiosMethods } = {
  get: 'get',
  create: 'post',
  update: 'put',
  change: 'patch',
  delete: 'delete',
};

function getHttpMethod(method: string) {
  return httpMethods[method.toLowerCase()] || 'get';
}

function camelToSnake(str: string) {
  return str.replace(/([A-Z])/g, function ($1) {
    return '_'.concat($1.toLowerCase());
  });
}

export const getAPI = function (apiUrl: string): API {
  return new Proxy(
    {},
    {
      get: function (_, method_name: string) {
        return async (props?: Record<string, string>) => {
          const apiMethod = camelToSnake(method_name);
          const httpMethod = getHttpMethod(apiMethod.split('_')[0]);
          const isGetMethod = httpMethod === 'get';
          const url = new URL(`${apiUrl}/${apiMethod.split('_')[1]}`);

          const options: AxiosRequestConfig = {};

          if (isGetMethod) {
            if (props) {
              url.search = new URLSearchParams(props).toString();
            }
          } else {
            options.data = props;
          }

          const response = await axios[httpMethod](url.toString(), options);

          return response;
        };
      },
    }
  ) as API;
};

export const apiInstance = axios.create({baseURL: import.meta.env.VITE_MS_API, withCredentials: true});
