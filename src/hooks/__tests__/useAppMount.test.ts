import { cleanup, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '@arpitmalik832/react-ts-rollup-library';

import useAppMount from '../useAppMount';
import useInitAxios from '../useInitAxios';

// Mock the external dependencies
jest.mock('@arpitmalik832/react-ts-rollup-library', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../useInitAxios', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useAppMount unit tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should call useTheme when mounted', () => {
    renderHook(() => useAppMount());
    expect(useTheme).toHaveBeenCalledTimes(1);
  });

  it('should call useInitAxios when mounted', () => {
    renderHook(() => useAppMount());
    expect(useInitAxios).toHaveBeenCalledTimes(1);
  });

  it('should call both hooks exactly once', () => {
    renderHook(() => useAppMount());

    expect(useTheme).toHaveBeenCalledTimes(1);
    expect(useInitAxios).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    const { result } = renderHook(() => useAppMount());
    expect(result.current).toBeUndefined();
  });
});
