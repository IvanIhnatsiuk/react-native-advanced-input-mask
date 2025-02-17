/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["module:@react-native/babel-preset"],
    overrides: [
      {
        exclude: /\/node_modules\//,
        plugins: [
          [
            "module-resolver",
            {
              extensions: [".tsx", ".ts", ".js", ".json"],
              alias: {
                "react-native-advanced-input-mask": "../../package/src",
              },
            },
          ],
        ],
      },
    ],
  };
};
