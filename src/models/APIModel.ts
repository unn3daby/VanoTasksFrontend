import { AxiosResponse } from "axios";

export type NewUser = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
} & NewUser;

export type UserInfo = Omit<User, 'password'>;

export interface BaseResponseModel<T> {
  items: T;
}

export interface PaginigModel {
  page: number;
  pages: number;
  size: number;
  total: number;
}

export type ResponseModel<T> = BaseResponseModel<T> & PaginigModel;

export interface API {
  getTasks<T>(): Promise<AxiosResponse<ResponseModel<T>>>;
}
