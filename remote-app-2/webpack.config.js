const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { VueLoaderPlugin } = require('vue-loader');
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/sandbox/index",
  mode: "development",
  devServer: {
    port: 8082,                                                                                                                                                                                     
    // webpack-dev-server >=5.2.1 sends "Cross-Origin-Resource-Policy: same-origin"                                                                                                                 
    // by default, which blocks the host app (:8080) from loading remoteEntry.js.                                                                                                                   
    // Declaring the CORS wildcard opts out of that header.                                                                                                                                         
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
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
        vue: {
          singleton: true,
          requiredVersion: packageJson.dependencies.vue
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};