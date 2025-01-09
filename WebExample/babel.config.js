const pak = require('../package.json');
const path = require('path');

/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    overrides: [
      {
        exclude: /\/node_modules\//,
        plugins: [
          '@babel/plugin-transform-strict-mode',
          [
            'module-resolver',
            {
              extensions: ['.tsx', '.ts', '.js', '.json'],
              alias: {
                [pak.name]: path.join(__dirname, '..', pak.source),
              },
            },
          ],
        ],
      },
    ],
  };
};
