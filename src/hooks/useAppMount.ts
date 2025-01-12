import { useTheme } from '@arpitmalik832/react-ts-rollup-library';
import useInitAxios from './useInitAxios';

function useAppMount() {
  useTheme();
  useInitAxios();
}

export default useAppMount;
