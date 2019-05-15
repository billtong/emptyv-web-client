'use strict';

const WebpackDevServer = require('webpack-dev-server');
const config = require('./config/webpack.dev.config');
// config.entry.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server');
const webpack = require('webpack');
const path = require('path');
const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, '../public'), // Default root
    stats: "errors-only", // Display Error Only in Console Log
    host:'localhost',
    port:'3000',
    open:true, // Open Browser Automatically
    hot:true, //Hot Loading
    hotOnly:true,
    inline: true,  // Auto Refresh
    historyApiFallback: true, //Single Page, All the link will be redirect to index.html
    publicPath: "/",
    compress: true // Compress with gzip
});
server.listen(3000, 'localhost', function (err) {
    if (err) throw err;
});
