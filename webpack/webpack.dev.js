// webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./build",
    hot: true,
    open: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // Enables hot reloading for React
  ],
});
