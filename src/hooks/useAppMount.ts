import {
  useInitAxios,
  useTheme,
} from '@arpitmalik832/react-js-rollup-monorepo-library';

function useAppMount() {
  useTheme();
  useInitAxios();
}

export default useAppMount;
