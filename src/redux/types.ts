import {
  BaseQueryFn,
  TypedUseQueryStateResult,
} from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosInstance } from 'axios';

interface SampleApiResponse {
  data: string[];
}

export interface BaseQueryParams {
  axiosInstance: AxiosInstance;
  url: string;
}

export type SampleQueryResponse = TypedUseQueryStateResult<
  SampleApiResponse,
  AxiosError,
  BaseQueryFn<BaseQueryParams>
>;
