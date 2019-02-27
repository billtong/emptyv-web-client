const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV;
module.exports = {
  mode: env || 'development',
  entry: [
    './app/app.jsx'
  ],

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePath: [
            path.resolve(__dirname, '/node_modules/foundation-sites/scss')
          ]
        },
        context: __dirname,
      },
    }),
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      //styles
      applicationStyles: 'app/styles/app.scss',
    },
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [{
      loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['transform-runtime'],
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      // Font and images
      {
        test: /\.(woff2?|svg)|(woff2?|svg|jpe?g|png|gif|ico)$/,
        loader: 'url-loader',
        options: {
          name: '[hash].[ext]',
          limit: 50000
        },
      },
      {
        test: /\.(ttf|eot)|(ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[hash].[ext]',
        },
      },      
      // CSS
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};

