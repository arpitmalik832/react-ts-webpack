import {
  useBackPress,
  Button,
} from '@arpitmalik832/react-js-rollup-monorepo-library';

import ButtonV2 from '../../components/atoms/Button';
import { ReactComponent as ReactIcon } from '../../assets/icons/react.svg';

function Home() {
  useBackPress();

  return (
    <div>
      Home
      <Button />
      <ButtonV2 />
      <ReactIcon />
    </div>
  );
}

export default Home;
