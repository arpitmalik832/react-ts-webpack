/**
 * Unit tests for useInitAxios hook.
 * @file The file is saved as `useInitAxios.test.jsx`.
 */
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxProvider } from '@arpitmalik832/react-ts-rollup-library';
import axios from 'axios';

import useInitAxios from '../useInitAxios';
import { APIData, ApisRedux } from '../../types/types';

describe('useInitAxios unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('snapshot test when data is present', () => {
    const apisSlice = createSlice({
      name: 'apis',
      initialState: [
        {
          host: 'no-url',
          headers: { x: 'a' } as Record<string, string>,
          axiosInstance: axios.create(),
        },
      ],
      reducers: {
        addNewApiData: (state: ApisRedux, action: PayloadAction<APIData>) => [
          ...state,
          action.payload,
        ],
      },
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    /**
     * Temporary component to initialize Axios.
     * @returns {import('react').JSX.Element} The rendered component.
     * @example
     * <TempComponent />
     */
    function TempComponent() {
      useInitAxios();

      return <div data-testid="temp-component" />;
    }

    const component = render(
      <ReduxProvider store={store}>
        <TempComponent />
      </ReduxProvider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('snapshot test when data is not present', () => {
    const apisSlice = createSlice({
      name: 'apis',
      initialState: [
        {
          host: '',
          headers: {},
          axiosInstance: axios.create(),
        },
      ],
      reducers: {
        addNewApiData: (state: ApisRedux, action: PayloadAction<APIData>) => [
          ...state,
          action.payload,
        ],
      },
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    /**
     * Temporary component to initialize Axios.
     * @returns {import('react').JSX.Element} The rendered component.
     * @example
     * <TempComponent />
     */
    function TempComponent() {
      useInitAxios();

      return <div data-testid="temp-component" />;
    }

    const component = render(
      <ReduxProvider store={store}>
        <TempComponent />
      </ReduxProvider>,
    );

    expect(component).toMatchSnapshot();
  });
});
