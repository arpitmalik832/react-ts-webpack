import { cleanup, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';

import hook from '../useAppMount';

jest.mock('@arpitmalik832/react-js-rollup-monorepo-library', () => ({
  __esModule: true,
  useTheme: jest.fn(),
  useInitAxios: jest.fn(),
}));

describe('useAppMount unit tests', () => {
  afterEach(cleanup);

  it('to match snapshot', () => {
    const renderedHook = renderHook(hook);

    expect(renderedHook).toMatchSnapshot();
  });
});
