import { ReduxProvider } from '@arpitmalik832/react-js-rollup-monorepo-library';

import Button from './index';
import store from '../../../redux/store/store';

export default {
  title: 'Atoms/Button',
  component: () => (
    <ReduxProvider store={store}>
      <Button />
    </ReduxProvider>
  ),
  tags: ['autodocs'],
};

export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};
