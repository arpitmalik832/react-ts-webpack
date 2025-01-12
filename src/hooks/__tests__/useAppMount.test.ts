import { cleanup, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import hook from '../useAppMount';

jest.mock('@arpitmalik832/react-ts-rollup-library', () => ({
  __esModule: true,
  useTheme: jest.fn(),
}));

jest.mock('../useInitAxios', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useAppMount unit tests', () => {
  afterEach(cleanup);

  it('to match snapshot', () => {
    const renderedHook = renderHook(hook);

    expect(renderedHook).toMatchSnapshot();
  });
});
