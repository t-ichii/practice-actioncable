const merge = require('webpack-merge')
const react = require('./react')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

console.dir(environment.toWebpackConfig())

module.exports = environment.toWebpackConfig()
