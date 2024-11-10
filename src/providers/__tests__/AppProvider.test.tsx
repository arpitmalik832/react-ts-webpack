import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import Component from '../AppProvider';

jest.mock('../../App', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-app" />),
}));

jest.mock('../../redux/store/store.ts', () => ({
  __esModule: true,
  default: {},
}));

jest.mock('@arpitmalik832/react-js-rollup-monorepo-library', () => ({
  __esModule: true,
  ReduxProvider: jest.fn(({ children }) => (
    <div data-testid="mock-redux-wrapper">{children}</div>
  )),
}));

describe('AppWrapper unit tests', () => {
  afterEach(cleanup);

  it('AppWrapper snapshot test', () => {
    const component = render(<Component />);

    expect(component).toMatchSnapshot();
  });
});
