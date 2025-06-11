const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { VueLoaderPlugin } = require('vue-loader');
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/sandbox.js",
  mode: "development",
  devServer: {
    port: 8081
  },
  output: {
    publicPath: "auto"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "remoteApp",
      filename: "remoteEntry.js",
      exposes: {
        "./MfeRemote": "./src/main"
      },
      shared: {
        ...packageJson.dependencies,
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};