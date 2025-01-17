/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-require-imports */
import {
  Api,
  BaseQueryFn,
  createApi,
  EndpointBuilder,
  EndpointDefinition,
} from '@reduxjs/toolkit/query/react';
import { AxiosInstance } from 'axios';

import { BaseQueryParams, SampleQueryResponse } from '../../types';

// Only mock the external dependencies
jest.mock('@reduxjs/toolkit/query/react', () => ({
  createApi: jest.fn(() => ({
    reducerPath: 'sampleQuery',
    tagTypes: ['Jokes'],
    middleware: jest.fn(),
    reducer: jest.fn(),
    util: {},
  })),
}));

jest.mock('@arpitmalik832/react-ts-rollup-library', () => ({
  queries: {
    baseQueryFn: jest.fn(() => ({
      baseQuery: 'mockedBaseQuery',
    })),
  },
}));

type BuilderType = EndpointBuilder<
  BaseQueryFn<BaseQueryParams, SampleQueryResponse, unknown>,
  'Jokes',
  'sampleQuery'
>;

interface QueryConfig {
  query: (axiosInstance: AxiosInstance) => {
    axiosInstance: AxiosInstance;
    url: string;
  };
  providesTags?: { type: 'Jokes'; id: string }[];
  invalidatesTags?: { type: 'Jokes'; id: string }[];
}

interface CreateApiConfig {
  endpoints: (builder: BuilderType) => {
    fetchData: QueryConfig;
    updateData: QueryConfig;
  };
}

type CreateApiMock = jest.Mock<unknown, [CreateApiConfig]>;

type ApiType = Api<
  BaseQueryFn<BaseQueryParams, SampleQueryResponse, unknown>,
  Record<
    string,
    EndpointDefinition<
      unknown,
      BaseQueryFn<unknown, unknown, unknown>,
      string,
      unknown
    >
  >,
  'Jokes',
  'sampleQuery'
>;

describe('sampleQuery Tests', () => {
  let endpointsBuilder: CreateApiConfig['endpoints'];

  // Create a complete mock builder with both query and mutation methods
  const createMockBuilder = () => ({
    query: jest.fn((config: QueryConfig) => ({
      query: config.query,
      providesTags: config.providesTags,
    })),
    mutation: jest.fn((config: QueryConfig) => ({
      query: config.query,
      invalidatesTags: config.invalidatesTags,
    })),
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Import the actual sampleQuery implementation to trigger createApi call
    jest.isolateModules(() => {
      require('../sampleQuery');
    });
    // Get the endpoints builder after createApi has been called
    endpointsBuilder = (createApi as CreateApiMock).mock.calls[0][0].endpoints;
  });

  describe('endpoints', () => {
    const mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
    } as unknown as AxiosInstance;

    describe('fetchData', () => {
      it('should have correct query configuration', () => {
        const mockBuilder = createMockBuilder();
        const endpoints = endpointsBuilder(
          mockBuilder as unknown as BuilderType,
        );

        const result = endpoints.fetchData.query(mockAxiosInstance);

        expect(result).toEqual({
          axiosInstance: mockAxiosInstance,
          url: '/jokes',
        });
      });

      it('should provide correct tags', () => {
        const mockBuilder = createMockBuilder();
        const endpoints = endpointsBuilder(
          mockBuilder as unknown as BuilderType,
        );

        expect(endpoints.fetchData.providesTags).toEqual([
          { type: 'Jokes', id: 'LIST' },
        ]);
      });
    });

    describe('updateData', () => {
      it('should have correct mutation configuration', () => {
        const mockBuilder = createMockBuilder();
        const endpoints = endpointsBuilder(
          mockBuilder as unknown as BuilderType,
        );

        const result = endpoints.updateData.query(mockAxiosInstance);

        expect(result).toEqual({
          axiosInstance: mockAxiosInstance,
          url: '/jokes/update',
        });
      });

      it('should invalidate correct tags', () => {
        const mockBuilder = createMockBuilder();
        const endpoints = endpointsBuilder(
          mockBuilder as unknown as BuilderType,
        );

        expect(endpoints.updateData.invalidatesTags).toEqual([
          { type: 'Jokes', id: 'LIST' },
        ]);
      });
    });
  });

  describe('API configuration', () => {
    it('should use correct base query function', () => {
      expect(createApi).toHaveBeenCalledWith({
        reducerPath: 'sampleQuery',
        baseQuery: {
          baseQuery: 'mockedBaseQuery',
        },
        tagTypes: ['Jokes'],
        endpoints: endpointsBuilder,
      });
    });

    it('should have correct endpoint configuration', () => {
      expect(typeof endpointsBuilder).toBe('function');
    });
  });

  describe('RTK Query integration', () => {
    it('should have required RTK Query properties', () => {
      // Import the actual sampleQuery for this test
      const {
        sampleQuery,
      }: {
        sampleQuery: ApiType;
      } = require('../sampleQuery') as {
        sampleQuery: ApiType;
      };
      expect(sampleQuery?.middleware).toBeDefined();
      expect(sampleQuery?.reducer).toBeDefined();
      expect(sampleQuery?.util).toBeDefined();
    });
  });
});
