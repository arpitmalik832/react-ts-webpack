import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import {
  slices,
  queries,
} from '@arpitmalik832/react-js-rollup-monorepo-library';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    app: slices.appSlice.reducer,
    apis: slices.apisSlice.reducer,
    navigation: slices.navigationSlice.reducer,
    sampleQuery: queries.sampleQuery.reducer,
  },
  middleware: getDefault =>
    getDefault({
      serializableCheck: {
        ignoredActions: [
          'apis/updateApi1AxiosInstance',
          'navigation/pushStack',
        ],
        ignoredPaths: ['apis', 'sampleQuery', 'navigation'],
      },
    }).concat(queries.sampleQuery.middleware, thunk, logger),
});
