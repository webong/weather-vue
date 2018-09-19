'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WEATHER_API: {
    search: '"https://xeta.000webhostapp.com/weather.php?command=search&keyword="',
    weather: '"https://xeta.000webhostapp.com/weather.php?command=location&woeid="'
  }
})
