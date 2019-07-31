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
      loader: 'eslint-loader',
      enforce: 'pre',
      exclude:/node_modules/,
      include:[path.resolve(__dirname, 'src')],
      options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: true
      }
    },{
      test: /\.js$/,
      exclude:/node_modules/,
      use: ['babel-loader']
    },{
      test:/\.scss$/,
      loader:'style-loader!css-loader!sass-loader'
    },{
      test:/\.css$/,
      use: ['style-loader','css-loader']
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