const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const src = path.resolve(__dirname, 'src');

module.exports = (env, argv) => ({
  entry: {
    main: './src/main.js',
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: 'chunks/[name].js',
    filename:
      argv.mode === 'production' ? '[name].js' : '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [src],
        exclude: /node_modules/,
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
    new MiniCssExtractPlugin({
      filename:
        argv.mode === 'production'
          ? '[name].[contenthash].css'
          : '[name].css'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: 'index.html'
      },
    ]),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'vendors.js',
          chunks: 'all',
          priority: 1
        }
      }
    },
    minimizer: [new UglifyJsPlugin()],
  },
  devServer: {
    contentBase: 'dist',
    host: '0.0.0.0',
    watchContentBase: true,
    hot: true,
    open: true,
    port: 3000,
    https: true,
    cert: path.resolve(__dirname, 'cert', "private.pem"),
    key: path.resolve(__dirname, 'cert', "private.key"),
    watchOptions: {
      ignored: /node_modules/
    }
  },
});
