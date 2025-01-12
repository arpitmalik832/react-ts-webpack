import { merge } from 'webpack-merge';

import commonConfig from './build_utils/webpack/configs/webpack.common.mjs';
import devConfig from './build_utils/webpack/configs/webpack.dev.mjs';
import prodConfig from './build_utils/webpack/configs/webpack.prod.mjs';
import federationConfig from './build_utils/webpack/configs/webpack.federation.mjs';
import bundleAnalyzerConfig from './build_utils/webpack/configs/webpack.bundleanalyzer.mjs';
import buildStatsConfig from './build_utils/webpack/configs/webpack.buildstats.mjs';
import workersConfig from './build_utils/webpack/configs/webpack.workers.mjs';

import { ENVS } from './build_utils/config/index.mjs';
import {
  ERR_NO_APP_ENV_FLAG,
  ERR_NO_BE_ENV_FLAG,
} from './build_utils/config/logs.mjs';

function addons() {
  const addFederation = process.env.INCLUDE_FEDERATION === 'true';
  const addVisualizer = process.env.INCLUDE_VISUALIZER === 'true';
  const addBuildStats = process.env.INCLUDE_BUILD_STATS === 'true';

  const configs = [];
  if (addFederation) configs.push(federationConfig);
  if (addVisualizer) configs.push(bundleAnalyzerConfig);
  if (addBuildStats) configs.push(buildStatsConfig);
  return configs;
}

function getConfig() {
  if (!process.env.APP_ENV) {
    throw new Error(ERR_NO_APP_ENV_FLAG);
  }
  if (!process.env.BE_ENV) {
    throw new Error(ERR_NO_BE_ENV_FLAG);
  }

  let envConfig;

  switch (process.env.APP_ENV) {
    case ENVS.PROD:
    case ENVS.BETA:
    case ENVS.STG:
      envConfig = prodConfig;
      break;
    case ENVS.DEV:
    default:
      envConfig = devConfig;
  }

  return merge(commonConfig, envConfig, workersConfig, ...addons());
}

export default getConfig;
