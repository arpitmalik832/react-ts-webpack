import { ReduxProvider } from '@arpitmalik832/react-js-rollup-monorepo-library';

import App from '../App';
import store from '../redux/store/store';

function AppProvider() {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
}

export default AppProvider;
