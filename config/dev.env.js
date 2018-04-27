'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const $c = require('./config.js')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  data : $c['development']
})
