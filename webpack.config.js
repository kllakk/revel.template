const webpack = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

const config = {
    entry: './app/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'js')
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
            },
            {
                test: /\.(woff2|woff|svg|ttf|eot)([\?]?.*)$/,
                use: 'file-loader?name=[name].[ext]&publicPath=/public/fonts/&outputPath=./../fonts/',
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('./../css/bundle.css'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}

module.exports = config;