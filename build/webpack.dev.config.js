const merge = require('webpack-merge');
const base = require('../build/webpack.base.config.js');
module.exports = merge(base,{
  mode: 'development',
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: '9191'
  }
})