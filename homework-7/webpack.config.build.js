const { merge } = require('webpack-merge');
const baseWebpackConfig = require("./webpack.config");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [new CleanWebpackPlugin]
})