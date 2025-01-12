import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ReduxProvider } from '@arpitmalik832/react-ts-rollup-library';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import Component from '../Home';
import { ApisRedux, APIData } from '../../types/types';
import { sampleQuery } from '../../redux/queries/sampleQuery';

jest.mock('../../components/atoms/Button', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-button" />),
}));

jest.mock('@arpitmalik832/react-ts-rollup-library', () => ({
  __esModule: true,
  ...jest.requireActual<object>('@arpitmalik832/react-ts-rollup-library'),
  useBackPress: jest.fn(),
  Button: jest.fn(() => <div data-testid="mock-button" />),
}));

describe('Unit tests for Home Page', () => {
  afterEach(cleanup);

  it('snapshot test', () => {
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
        sampleQuery: sampleQuery.reducer,
      },
      middleware: getDefault => getDefault().concat(sampleQuery.middleware),
    });

    const component = render(
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('no api data is present', () => {
    const apisSlice = createSlice({
      name: 'apis',
      initialState: [] as ApisRedux,
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
        sampleQuery: sampleQuery.reducer,
      },
      middleware: getDefault => getDefault().concat(sampleQuery.middleware),
    });

    const component = render(
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>,
    );

    expect(component).toMatchSnapshot();
  });
});
