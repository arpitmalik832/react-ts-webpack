import { slices } from '@arpitmalik832/react-ts-rollup-library';
import { configureStore } from '@reduxjs/toolkit';
import { sampleQuery } from '../queries/sampleQuery';

const store = configureStore({
  reducer: {
    app: slices.appSlice.reducer,
    apis: slices.apisSlice.reducer,
    navigation: slices.navigationSlice.reducer,
    sampleQuery: sampleQuery.reducer,
  },
  middleware: getDefault =>
    getDefault({
      serializableCheck: {
        ignoredActions: ['apis/addNewApiData', 'navigation/pushStack'],
        ignoredPaths: ['apis', 'sampleQuery', 'navigation'],
      },
    }).concat(sampleQuery.middleware),
});

export default store;
