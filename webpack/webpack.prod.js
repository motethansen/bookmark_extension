// webpack.prod.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = (argv, env) => {
  let output = {
    filename: "[name].js",
    path: path.join(__dirname, "../build/default"),
    clean: true,
  };
  console.log(argv["browser"]);

  if (argv.browser === "chrome") {
    output["path"] = path.join(__dirname, "../build/chrome");
  } else if (argv.browser === "firefox") {
    output["path"] = path.join(__dirname, "../build/firefox");
  }
  return merge(common, {
    output: output,
    mode: "production",
    devtool: "source-map",
  });
};
