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
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader']
    },{
      test:/\.css$/,
      loader:'style-loader!css-loader'
    }]
  },
  plugins: [
    new webpackHtmlPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: './favicon.ico'
    })
  ],
}