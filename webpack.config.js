/**
 * Created by nmondon on 23/09/2014.
 */

module.exports = {
    entry: {
        background: './js/background.js',
        popup: './js/popup.js'
    },
    output: {
        path: 'chrome-extension/js',
        filename: '[name].js'
    }
};