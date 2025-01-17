import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReduxProvider, slices } from '@arpitmalik832/react-ts-rollup-library';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';

import Button from '../Button';
import { AppRedux } from '../../../types/types';

describe('Button unit tests', () => {
  let store: EnhancedStore<{
    app: AppRedux;
  }>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        app: slices?.appSlice?.reducer,
      },
    });
    // Mock the dispatch function
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const renderButton = () =>
    render(
      <ReduxProvider store={store}>
        <Button />
      </ReduxProvider>,
    );

  test('Button snapshot test', () => {
    const { container } = renderButton();
    expect(container).toMatchSnapshot();
  });

  it('renders with correct text content', () => {
    const { getByTestId } = renderButton();
    expect(getByTestId('button')).toHaveTextContent('Button');
  });

  it('has correct button attributes', () => {
    const { getByTestId } = renderButton();
    const button = getByTestId('button');

    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-cy', 'button');
    expect(button).toHaveClass('button');
  });

  it('dispatches correct action on click', () => {
    const { getByTestId } = renderButton();
    const button = getByTestId('button');

    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      slices.updateStore({ key: 'x', value: 'a' }),
    );
  });
});
