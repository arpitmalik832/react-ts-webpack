import {
  errorLog,
  SWRegistration,
} from '@arpitmalik832/react-js-rollup-monorepo-library';

import { ENVS } from '../build_utils/config';

import('./bootstrap').then(({ mount }) => {
  const appElement = document.getElementById('app');
  if (appElement) {
    mount(appElement);
  } else {
    errorLog('App element not found');
  }
});

SWRegistration.register();

if (process.env.APP_ENV !== ENVS.PROD) {
  import('@arpitmalik832/react-js-rollup-monorepo-library').then(
    ({ reportWebVitals: func }) => func(),
  );
}
