const webpack = require('webpack'); //to access built-in plugins
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
                exclude: /(node_modules|bower_components)/,
                test: /\.(js|jsx)$/, use: 'babel-loader'
            }
        ]
    }
}

module.exports = config;