import React from 'react';
import { RouteObject } from 'react-router';
import routes from '../routes';

// Mock React's lazy
jest.mock('react', () => ({
  ...jest.requireActual<object>('react'),
  lazy: jest.fn(
    (importFn: () => Promise<unknown>) =>
      importFn() as Promise<typeof importFn>,
  ),
}));

// Mock createBrowserRouter
jest.mock('react-router', () => ({
  ...jest.requireActual<object>('react-router'),
  createBrowserRouter: jest.fn((x: RouteObject[]) => x),
}));

describe('Router Configuration Tests', () => {
  let router: RouteObject[];

  beforeEach(async () => {
    jest.clearAllMocks();
    const { default: routerConfig } = await import('../index');
    router = routerConfig as unknown as RouteObject[];
  });

  it('should have correct root route configuration', () => {
    const rootRoute = router[0];
    expect(rootRoute).toEqual(
      expect.objectContaining({
        path: '/',
        element: expect.any(Object) as React.ReactElement,
        errorElement: expect.any(Object) as React.ReactElement,
        children: routes,
      }),
    );
  });

  it('should use PageWrapper as root element', () => {
    const rootRoute = router[0];
    expect(rootRoute?.element).toBeDefined();
  });

  it('should use ErrorBoundary as error element', () => {
    const rootRoute = router[0];
    expect(rootRoute?.errorElement).toBeDefined();
  });

  it('should have routes as children', () => {
    const rootRoute = router[0];
    expect(rootRoute?.children).toStrictEqual(routes);
  });
});
