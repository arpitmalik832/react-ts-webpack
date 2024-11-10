import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Component from '../Home';

jest.mock('../../components/atoms/Button', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-button" />),
}));

jest.mock('@arpitmalik832/react-js-rollup-monorepo-library', () => ({
  __esModule: true,
  useBackPress: jest.fn(),
  Button: jest.fn(() => <div data-testid="mock-button" />),
}));

describe('Unit tests for Home Page', () => {
  afterEach(cleanup);
  it('snapshot test', () => {
    const component = render(<Component />);

    expect(component).toMatchSnapshot();
  });
});
