import { Config } from '@svgr/core';

const config: Config = {
  prettier: true,
  svgo: true,
  exportType: 'named',
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  },
  titleProp: true,
  ref: true,
  icon: false,
};

export default config;
