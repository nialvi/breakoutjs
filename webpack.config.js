const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { di } = require("@wessberg/di-compiler");
const path = require("path");

const config = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: (program) => di({ program }),
            },
          },
        ],
      },
    ],
  },
};

module.exports = config;
