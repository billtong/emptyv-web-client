
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

process.env.NODE_ENV = 'development';

module.exports = merge(webpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:4096',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../../src/index.js'),
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
