const path = require('path');
const webpackHtmlPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new webpackHtmlPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: './favicon.ico'
    })
  ]
}