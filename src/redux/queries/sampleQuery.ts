import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosInstance } from 'axios';

import { queries } from '@arpitmalik832/react-ts-rollup-library';
import { BaseQueryParams, SampleQueryResponse } from '../types';

const sampleQuery = createApi({
  reducerPath: 'sampleQuery',
  baseQuery: queries.baseQueryFn<BaseQueryParams, SampleQueryResponse>(),
  tagTypes: ['Jokes'],
  endpoints: builder => ({
    fetchData: builder.query({
      query: (axiosInstance: AxiosInstance) => ({
        axiosInstance,
        url: '/jokes',
      }),
      providesTags: [{ type: 'Jokes', id: 'LIST' }],
    }),
    updateData: builder.mutation({
      query: (axiosInstance: AxiosInstance) => ({
        axiosInstance,
        url: '/jokes/update',
      }),
      invalidatesTags: [{ type: 'Jokes', id: 'LIST' }],
    }),
  }),
});

export { sampleQuery };
export const { useFetchDataQuery, useUpdateDataMutation } = sampleQuery;
