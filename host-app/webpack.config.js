const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const { ModuleFederationPlugin } = require("webpack").container;
const packageJson = require("./package.json");

function generateFriendlyChunkFilename(pathData) {
  const defaultChunkName = `[name].[contenthash].js`;
  const filename = pathData.chunk.id;
  const isPackage = filename.includes("-npm-");
  if (isPackage) {
    return defaultChunkName.replace("[name]", cleanPackageName(filename));
  }
  return defaultChunkName.replace("[name]", cleanFilename(filename));
}

/*
 * Cleans up the filename to remove unnecessary folder paths.
 *
 * @param filename: A string containing a full webpack chunkId
 */
function cleanFilename(filename) {
  return filename
    .replace("vendors-_yarn_cache_", "")
    .replace("_yarn_cache_", "")
    .replace("vendors-_yarn___virtual___", "")
    .replace("zip_node_modules_", "")
    .replace("zip_node_modules", "");
}

/*
 * Cleans up a package to return just the name and version .
 *
 * @param packageName: A string containing a webpack chunkId of a package
 */
function cleanPackageName(filename) {
  const packageName = cleanFilename(filename);
  // Webpack appears to truncate the chunkId at a set length, so sections like moduleIdentifier must be optional
  const packagePattern = new RegExp(
    "(?<packageName>.*)-npm-(?<packageVersion>[^-]*)-(?<packageHash>[^_]*)_?(?<moduleIdentifier>.*)",
  );
  const virtualPackagePattern = new RegExp(
    "(.*)-virtual-(.*)_cache_(?<packageName>.*)-npm-(?<packageVersion>[^-]*)-(?<packageHash>[^_]*)",
  );

  const isVirtualPackage =
    packageName.includes("-virtual-") && packageName.includes("_cache_");

  const results = packageName.match(
    isVirtualPackage ? virtualPackagePattern : packagePattern,
  );
  if (results === null || !results.groups) {
    throw new Error(
      `@ithaka/mfe-webpack-config - generateFriendlyChunkFilename could not parse package name from ${packageName}`,
    );
  }
  return [results.groups.packageName, results.groups.packageVersion].join("_");
}

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 8080
  },
  output: {
    chunkFilename: generateFriendlyChunkFilename,
    filename: "[name].[contenthash].js",
  },
  optimization: {
    chunkIds: "named",
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
        remoteApp: 'remoteApp@http://localhost:8081/remoteEntry.js',
      },
      shared: {
        ...packageJson.dependencies,
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