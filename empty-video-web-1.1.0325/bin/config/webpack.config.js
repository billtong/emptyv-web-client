
const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV;
module.exports = {
    mode: env || 'development',
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../public')
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
        alias: {
            //styles
            applicationStyles: path.resolve(__dirname, '../../src/app/styles/app.scss'),
        },
        extensions: ['*', '.js', '.jsx']
    },
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
    module: {
        rules: [
            {
                test: /\.(js|mjs|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                },
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
            // CSS, SASS & SCSS
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                include: /node_modules/,
                loaders: ['style-loader', 'sass-loader'],
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map'
};

