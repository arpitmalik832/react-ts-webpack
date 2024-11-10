import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import PageWrapper from '../PageWrapper';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/test',
  }),
}));

describe('PageWrapper unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('PageWrapper snapshot test', () => {
    const component = render(<PageWrapper />);

    expect(component).toMatchSnapshot();
  });
});
