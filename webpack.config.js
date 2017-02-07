const webpack = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
var path = require('path');

const config = {
    entry: {
        bundle: './app/js/app.js'
    },
    output: {
        //filename: '[name].[chunkhash].js',
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?importLoaders=1!postcss-loader!sass-loader'
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?importLoaders=1!postcss-loader'
                })
            },
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.(woff2|woff|svg|ttf|eot)([\?]?.*)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=/public/fonts/&outputPath=./fonts/',
            },
            {
                test   : /\.(jpg|png|gif)$/,
                loader : 'url-loader?name=[name].[hash].[ext]'
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        //new ExtractTextPlugin('./../css/[name].[contenthash].css'),
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ManifestPlugin({
            fileName: './manifest.json',
        }),
    ]
}

module.exports = config;