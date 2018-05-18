'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
const $c = require('./config.js')
module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  data : $c['testing']
})
