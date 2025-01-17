import { configureStore, Middleware } from '@reduxjs/toolkit';
import { slices } from '@arpitmalik832/react-ts-rollup-library';
import { sampleQuery } from '../../queries/sampleQuery';

jest.mock('@reduxjs/toolkit/query/react', () => ({
  createApi: jest.fn(() => ({
    reducerPath: 'sampleQuery',
    reducer: jest.fn(),
    middleware: jest.fn(),
    util: {},
  })),
}));

jest.mock('@reduxjs/toolkit', () => ({
  configureStore: jest.fn(() => ({
    dispatch: jest.fn(),
    getState: jest.fn(),
  })),
}));

jest.mock('@arpitmalik832/react-ts-rollup-library', () => ({
  slices: {
    appSlice: { reducer: jest.fn() },
    apisSlice: { reducer: jest.fn() },
    navigationSlice: { reducer: jest.fn() },
  },
  queries: {
    baseQueryFn: jest.fn(() => jest.fn()),
  },
}));

describe('Development Store Configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  interface StoreConfig {
    middleware: (getDefaultMiddleware: () => Middleware[]) => Middleware[];
  }

  type CreateStoreMock = jest.Mock<unknown, [StoreConfig]>;

  it('should configure store with correct reducers', async () => {
    await import('../store.dev');

    // Get middleware configuration function
    const middlewareConfig = (configureStore as unknown as CreateStoreMock).mock
      .calls[0][0].middleware;

    // Create mock getDefault function
    const mockGetDefault = jest.fn(() => []);

    // Call middleware configuration function
    middlewareConfig(mockGetDefault);

    expect(configureStore).toHaveBeenCalledWith({
      reducer: {
        app: slices.appSlice.reducer,
        apis: slices.apisSlice.reducer,
        navigation: slices.navigationSlice.reducer,
        sampleQuery: sampleQuery.reducer,
      },
      middleware: expect.any(Function) as (
        getDefaultMiddleware: () => Middleware[],
      ) => Middleware[],
    });
  });
});
