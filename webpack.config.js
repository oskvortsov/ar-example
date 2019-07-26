const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => ({
  entry: {
    main: './src/index.js',
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename:
      argv.mode === 'production'
        ? 'chunks/[name].[chunkhash].js'
        : 'chunks/[name].js',
    filename:
      argv.mode === 'production' ? '[name].[chunkhash].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename:
        argv.mode === 'production'
          ? '[name].[contenthash].css'
          : '[name].css'
    }),
  ],
  devServer: {
    contentBase: 'dist',
    watchContentBase: true,
    hot: true,
    open: true,
    port: 3000
  },
});
