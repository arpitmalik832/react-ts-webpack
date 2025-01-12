import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReduxProvider, slices } from '@arpitmalik832/react-ts-rollup-library';
import { configureStore } from '@reduxjs/toolkit';

import Component from '../Button';

describe('Button unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  const store = configureStore({
    reducer: {
      app: slices?.appSlice?.reducer,
    },
  });

  test('Button snapshot test', () => {
    const component = render(
      <div>
        <ReduxProvider store={store}>
          <Component />
        </ReduxProvider>
      </div>,
    );

    expect(component).toMatchSnapshot();
  });

  it('Button renders correctly', () => {
    const { getByTestId } = render(
      <div>
        <ReduxProvider store={store}>
          <Component />
        </ReduxProvider>
      </div>,
    );

    expect(getByTestId('button')).toHaveTextContent('Button');
    fireEvent.click(getByTestId('button'));
  });
});
