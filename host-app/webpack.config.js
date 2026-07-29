const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 8080
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
      remotes: {
        remoteApp1: 'remoteApp1@http://localhost:8081/remoteEntry.js',
        remoteApp2: 'remoteApp2@http://localhost:8082/remoteEntry.js',
      },
      shared: {
        ...packageJson.dependencies,
        vue: {
          singleton: true,
          requiredVersion: packageJson.dependencies.vue
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "@vue/runtime-dom"
    }
  }
};