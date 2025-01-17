import {
  useBackPress,
  Button,
  log,
} from '@arpitmalik832/react-ts-rollup-library';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import ButtonV2 from '../../components/atoms/Button';
import { ReactComponent as ReactIcon } from '../../assets/icons/react.svg';
import { ApisRedux, ReduxState } from '../../types/types';
import { useFetchDataQuery } from '../../redux/queries/sampleQuery';
import { SampleQueryResponse } from '../../redux/types';

function Home() {
  const apis = useSelector<ReduxState, ApisRedux>(state => state.apis);

  useBackPress();
  const { data, isLoading, isError } = useFetchDataQuery<SampleQueryResponse>(
    apis[0].axiosInstance,
  );

  useEffect(() => {
    log({ isLoading, data, isError });
  }, [isLoading, data, isError]);

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
