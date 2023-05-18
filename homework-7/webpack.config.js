const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PATH = require('./paths.js');

module.exports = {
    entry: path.join(PATH.SRC, 'index.js'),
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(PATH.DIST)
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            assets: path.resolve(PATH.ASSETS),
            src: path.resolve(PATH.SRC),
        }
    },
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
              },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true},
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader',            
                ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(PATH.PUBLIC, 'index.html')
        })
    ]
}