const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("./package.json");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 8080,                                                                                                                                                                                     
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