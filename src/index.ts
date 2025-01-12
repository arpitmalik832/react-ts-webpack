import {
  errorLog,
  SWRegistration,
} from '@arpitmalik832/react-ts-rollup-library';

import { ENVS } from '../build_utils/config';

import('./bootstrap')
  .then(({ mount }) => {
    const appElement = document.getElementById('app');
    if (appElement) {
      mount(appElement);
    } else {
      errorLog('App element not found');
    }
  })
  .catch((err: Error) => {
    errorLog('Facing err while importing bootstrap file: ', err);
  });

SWRegistration.register();

if (process.env.APP_ENV !== ENVS.PROD) {
  import('@arpitmalik832/react-ts-rollup-library')
    .then(({ reportWebVitals: func }) => func())
    .catch((err: Error) => {
      errorLog(
        'Facing issue while using reportWebVitals from external library',
        err,
      );
    });
}
