import { ENVS } from '../../../build_utils/config';
import devStore from './store.dev';
import prodStore from './store.prod';

const store = process.env.APP_ENV === ENVS.PROD ? prodStore : devStore;

export default store;
