const base = require('../build/webpack.base.config.js');
const merge = require('webpack-merge');
module.exports = merge({
  mode: 'production'
}, base)