const path = require("path");

const webpack = require("webpack");
const appDirectory = path.resolve(__dirname, ".");

const pack = require("../../package/package.json");
const modules = Object.keys(pack.peerDependencies);

const babelLoaderConfiguration = {
  test: /\.(js|jsx|ts|tsx)$/,
  include: [
    path.resolve(appDirectory, "index.web.js"),
    path.resolve(appDirectory, "src"),
    path.resolve(__dirname, "../../package/src"),
    path.resolve(__dirname, "node_modules/react-native-gesture-handler"),
    path.resolve(__dirname, "node_modules/react-native-reanimated"),
  ],
  use: {
    loader: "babel-loader",
    options: {
      configFile: true,
      cacheDirectory: true,
      presets: [
        ["@babel/preset-env", { loose: true }],
        "@babel/preset-react",
        "@babel/preset-typescript",
      ],
      plugins: [
        ["@babel/plugin-transform-class-properties", { loose: true }],
        ["@babel/plugin-transform-private-methods", { loose: true }],
        ["@babel/plugin-transform-private-property-in-object", { loose: true }],
        "@babel/plugin-transform-flow-strip-types",
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
    new webpack.DefinePlugin({
      process: {
        env: {},
        platform: JSON.stringify("web"),
      },
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== "production",
    }),
    new webpack.ContextReplacementPlugin(
      /react-native-worklets[/\\]lib/,
      path.resolve(__dirname, "src"),
    ),
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
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      {
        test: /\.(js|ts|tsx)$/,
        use: "babel-loader",
        exclude:
          /node_modules\/(?!react-native-|@react-native|react-native-advanced-input-mask)/,
      },
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
      "react-native-reanimated": path.resolve(
        __dirname,
        "node_modules/react-native-reanimated",
      ),
      "react-native-gesture-handler": path.resolve(
        __dirname,
        "node_modules/react-native-gesture-handler",
      ),
    },
    extensions: [
      ".web.js",
      ".web.tsx",
      ".web.ts",
      ".js",
      ".jsx",
      ".json",
      ".ts",
      ".tsx",
    ],
  },
});
