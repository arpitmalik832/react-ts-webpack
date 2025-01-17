/**
 * This file is used to test the routes configuration.
 * @file This file is saved as 'src/routes/__tests__/routes.test.jsx'.
 */
import React, { ReactElement } from 'react';
import { HtmlContent } from '@arpitmalik832/react-ts-rollup-library';
// import { RouteObject } from 'react-router';
import routes from '../routes';
import { ROUTES, SEO } from '../../enums/routes';

// Mock React's lazy
jest.mock('react', () => ({
  ...jest.requireActual<object>('react'),
  lazy: jest.fn(
    (importFn: () => Promise<unknown>) =>
      importFn() as Promise<typeof importFn>,
  ),
}));

// Mock the dynamic imports
jest.mock('../../pages/Home', () => () => <div>Home Page</div>);
jest.mock('../../pages/Abc', () => () => <div>Abc Page</div>);
jest.mock('../../pages/NotFound', () => () => <div>NotFound Page</div>);

jest.mock('@arpitmalik832/react-ts-rollup-library', () => ({
  ComponentWithSuspense: jest.fn(
    ({ component }: { component: React.ReactNode }) => component,
  ),
  HtmlContent: jest.fn(
    ({ title, description }: { title: string; description: string }) => (
      <div
        data-testid="html-content"
        data-title={title}
        data-description={description}
      />
    ),
  ),
}));

interface RouteConfig {
  index?: boolean;
  path?: string;
  element: React.ReactElement<{
    children: [
      React.ReactElement<{
        title: string;
        description: string;
      }>,
      React.ReactElement,
    ];
  }>;
}

describe('Routes Configuration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should export routes array', () => {
    expect(Array.isArray(routes)).toBe(true);
    expect(routes.length).toBe(3);
  });

  describe('Home Route', () => {
    it('should have correct index route configuration', () => {
      const homeRoute = routes.find(
        route => route.index === true,
      ) as RouteConfig;
      expect(homeRoute).toBeDefined();
      expect(homeRoute.element).toBeDefined();
    });

    it('should have correct SEO configuration', () => {
      const homeRoute = routes.find(
        route => route.index === true,
      ) as RouteConfig;
      const htmlContent = React.Children.toArray(
        homeRoute.element.props.children,
      )[0];
      expect(
        ((htmlContent as ReactElement).props as Record<string, string>).title,
      ).toBe(SEO.HOME.TITLE);
      expect(
        ((htmlContent as ReactElement).props as Record<string, string>)
          .description,
      ).toBe(SEO.HOME.DESC);
    });
  });

  describe('Abc Route', () => {
    it('should have correct path configuration', () => {
      const abcRoute = routes.find(
        route => route.path === ROUTES.ABC,
      ) as RouteConfig;
      expect(abcRoute).toBeDefined();
      expect(abcRoute.element).toBeDefined();
    });

    it('should have correct SEO configuration', () => {
      const abcRoute = routes.find(
        route => route.path === ROUTES.ABC,
      ) as RouteConfig;
      const htmlContent = React.Children.toArray(
        abcRoute.element.props.children,
      )[0];
      expect(
        ((htmlContent as ReactElement).props as Record<string, string>).title,
      ).toBe(SEO.ABC.TITLE);
      expect(
        ((htmlContent as ReactElement).props as Record<string, string>)
          .description,
      ).toBe(SEO.ABC.DESC);
    });
  });

  describe('NotFound Route', () => {
    it('should have correct path configuration', () => {
      const notFoundRoute = routes.find(
        route => route.path === ROUTES.NOT_FOUND,
      ) as RouteConfig;
      expect(notFoundRoute).toBeDefined();
      expect(notFoundRoute.element).toBeDefined();
    });

    it('should have correct SEO configuration', () => {
      const notFoundRoute = routes.find(
        route => route.path === ROUTES.NOT_FOUND,
      ) as RouteConfig;
      const htmlContent = React.Children.toArray(
        notFoundRoute.element.props.children,
      )[0];
      expect(
        ((htmlContent as ReactElement).props as Record<string, string>).title,
      ).toBe(SEO.NOT_FOUND.TITLE);
      expect(
        ((htmlContent as ReactElement).props as Record<string, string>)
          .description,
      ).toBe(SEO.NOT_FOUND.DESC);
    });
  });

  describe('Route Components', () => {
    it('should use HtmlContent for SEO in all routes', () => {
      const htmlContentCount = routes.reduce((count, route) => {
        const firstChild = React.Children.toArray(
          (route as RouteConfig).element.props.children,
        )[0];
        return (
          count + ((firstChild as ReactElement).type === HtmlContent ? 1 : 0)
        );
      }, 0);
      expect(htmlContentCount).toBe(3);
    });
  });
});
