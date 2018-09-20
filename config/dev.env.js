'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WEATHER_API: 'http://xeta.000webhostapp.com/weather.php' 
})
