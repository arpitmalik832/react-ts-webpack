import type {
  AxiosInstance,
} from 'axios';

export type AllParams =
  | string
  | string[]
  | object
  | object[]
  | number
  | number[]
  | bigint
  | bigint[]
  | boolean
  | boolean[];

export interface VoidFunctionWithParams extends VoidFunction {
  (...args: AllParams[]): void;
}

export interface KeyValuePair<T> {
  key: string;
  value: T | Record<string, T>;
}

export interface AppRedux {
  theme: string;
}

export interface NavigationRedux {
  stack: VoidFunctionWithParams[];
}

export interface APIData {
  host: string;
  headers: Record<string, string>;
  axiosInstance: AxiosInstance;
}

export type ApisRedux = APIData[];

export interface ReduxState {
  app: AppRedux;
  apis: ApisRedux;
  navigation: NavigationRedux;
}