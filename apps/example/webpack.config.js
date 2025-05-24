const path = require("path");

const webpack = require("webpack");
const appDirectory = path.resolve(__dirname, ".");

const pack = require("../../package/package.json");
const modules = Object.keys(pack.peerDependencies);

const babelLoaderConfiguration = {
  test: /\.(js|ts)x?$/,
  include: [path.resolve(appDirectory, "index.web.js")],
  use: {
    loader: "babel-loader",
    options: {
      configFile: true,
      cacheDirectory: true,
      presets: ["module:@react-native/babel-preset"],
      plugins: [["react-native-web", { commonjs: true }]],
      overrides: [
        {
          exclude: /node_modules\/(?!react-native-advanced-input-mask\/src)/,
          plugins: [
            [
              "module-resolver",
              {
                extensions: [
                  "web.tsx",
                  "web.ts",
                  "web.js",
                  ".json",
                  ".ts",
                  ".js",
                  ".tsx",
                  ".web.tsx",
                ],
                alias: {
                  "react-native-advanced-input-mask": "../../package/src",
                },
              },
            ],
          ],
        },
      ],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
      esModule: false,
    },
  },
};

module.exports = (_, defaults) => ({
  devServer: {
    open: true,
  },
  mode: "development",
  entry: [path.resolve(appDirectory, "index.web.js")],
  output: {
    filename: "bundle.web.js",
    path: path.resolve(appDirectory, "dist"),
  },

  plugins: [
    new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }),
    new webpack.DefinePlugin({ process: { env: {} } }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== "production",
    }),
  ],

  module: {
    ...defaults.module,
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      babelLoaderConfiguration,
      imageLoaderConfiguration,
    ],
  },

  resolve: {
    ...defaults.resolve,
    symlinks: true,
    alias: {
      ...modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, "node_modules", name);

        return acc;
      }, {}),
      "react-native-advanced-input-mask": path.resolve(
        __dirname,
        "../../package/src",
      ),
      "react-native": "react-native-web",
    },
    extensions: [
      ".web.js",
      ".js",
      ".web.ts",
      ".ts",
      ".web.tsx",
      ".tsx",
      ".jsx",
    ],
  },
});
