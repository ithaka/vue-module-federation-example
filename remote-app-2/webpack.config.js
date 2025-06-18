const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { VueLoaderPlugin } = require('vue-loader');
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/sandbox/index",
  mode: "development",
  devServer: {
    port: 8082
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            hotReload: false
          },
        },
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
      name: "remoteApp2",
      filename: "remoteEntry.js",
      exposes: {
        "./MfeRemote2": "./src/bootstrap",
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