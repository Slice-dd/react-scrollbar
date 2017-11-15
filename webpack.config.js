const htmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrower = require('open-browser-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: './index.js',
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        port: 8080,
        hot: true,
        disableHostCheck: true
    }

}