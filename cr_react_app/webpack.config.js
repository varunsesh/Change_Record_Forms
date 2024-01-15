const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  performance: { hints: false },

  entry: "./src/index.js",
  // Should be turned off in Production
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        exclude: /node_modules/,
        type: 'asset/inline',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  // externals: {
  //   googleapis: "commonjs googleapis"
  // },

  resolve: { 
    extensions: [".js", ".json", ".jsx", ".css", ".scss", ".ts", ".tsx"], 
    fallback: {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      net: false,
      tls: false,
      fs: false,
      os: require.resolve('os-browserify/browser'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'), 
      buffer: require.resolve("buffer/"),
      url: require.resolve("url/"),
      crypto: require.resolve("crypto-browserify"), 
      http2:false, 
      zlib: require.resolve("browserify-zlib")
    } 
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],

};