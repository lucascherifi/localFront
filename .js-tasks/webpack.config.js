'use strict'

var path = require('path')

module.exports = {
    entry: {
        background: path.resolve('src/background.js'),
        popup: path.resolve('src/popup.jsx')
    },
    output: {
        path: 'chrome-extension/js',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                optional: ['runtime'],
                stage: 0
            }
        }]
    }
}