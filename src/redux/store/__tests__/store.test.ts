/**
 * This file is used to test the store configuration.
 * @file This file is saved as 'src/redux/store/__tests__/store.test.js'.
 */
import { EnhancedStore } from '@reduxjs/toolkit';
import { ENVS } from '../../../../build_utils/config';
import devStore from '../store.dev';
import prodStore from '../store.prod';

// Mock the environment modules
jest.mock('../store.dev', () => ({
  __esModule: true,
  default: {
    type: 'devStore',
  },
}));

jest.mock('../store.prod', () => ({
  __esModule: true,
  default: {
    type: 'prodStore',
  },
}));

jest.mock('../../../../build_utils/config/index.mjs', () => ({
  ENVS: {
    PROD: 'production',
    DEV: 'development',
  },
}));

interface MockStore extends EnhancedStore {
  type: string;
}

describe('Store Configuration Tests', () => {
  // Store the original environment
  const originalEnv = process.env.APP_ENV;

  afterEach(() => {
    // Restore the original environment after each test
    process.env.APP_ENV = originalEnv;
    jest.resetModules();
  });

  it('should export development store when APP_ENV is not production', async () => {
    process.env.APP_ENV = ENVS.DEV;
    const { default: store } = await import('../store');
    expect(store).toEqual(devStore);
    expect((store as MockStore).type).toBe('devStore');
  });

  it('should export production store when APP_ENV is production', async () => {
    process.env.APP_ENV = ENVS.PROD;
    const { default: store } = await import('../store');
    expect(store).toEqual(prodStore);
    expect((store as MockStore).type).toBe('prodStore');
  });

  it('should default to development store when APP_ENV is undefined', async () => {
    process.env.APP_ENV = undefined;
    const { default: store } = await import('../store');
    expect(store).toEqual(devStore);
    expect((store as MockStore).type).toBe('devStore');
  });

  it('should default to development store when APP_ENV is invalid', async () => {
    process.env.APP_ENV = 'invalid';
    const { default: store } = await import('../store');
    expect(store).toEqual(devStore);
    expect((store as MockStore).type).toBe('devStore');
  });

  describe('Environment Constants', () => {
    it('should have correct environment values', () => {
      expect(ENVS.PROD).toBe('production');
      expect(ENVS.DEV).toBe('development');
    });
  });

  describe('Store Imports', () => {
    it('should successfully import development store', () => {
      expect(devStore).toBeDefined();
      expect((devStore as MockStore).type).toBe('devStore');
    });

    it('should successfully import production store', () => {
      expect(prodStore).toBeDefined();
      expect((prodStore as MockStore).type).toBe('prodStore');
    });
  });
});
