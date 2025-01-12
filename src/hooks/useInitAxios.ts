import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import {
  addRequestInterceptor,
  addResponseInterceptor,
  slices,
  APP,
} from '@arpitmalik832/react-ts-rollup-library';

function useInitAxios() {
  const dispatch = useDispatch();

  const api1 = {
    host: 'no-host',
    headers: {},
  };

  useEffect(() => {
    if (api1.host && api1.headers) {
      const axiosInstance = axios.create({
        baseURL: api1.host,
        timeout: APP.API1_TIMEOUT,
        headers: {
          common: {
            ...api1.headers,
          },
        },
      });

      addRequestInterceptor(axiosInstance);
      addResponseInterceptor(axiosInstance);

      const api1Final = {
        host: api1.host,
        headers: api1.headers,
        axiosInstance,
      };

      dispatch(slices.addNewApiData(api1Final));
    }
  }, []);
}

export default useInitAxios;
