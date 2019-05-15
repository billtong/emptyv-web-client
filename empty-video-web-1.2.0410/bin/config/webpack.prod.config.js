const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const env = process.env.NODE_ENV;
process.env.NODE_ENV = 'production';

module.exports = merge(webpackConfig, {
  mode: env || 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../public')
  }
});
