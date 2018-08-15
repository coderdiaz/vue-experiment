const fs = require('fs')

// Getting entries for webpack with FileSystem
const getEntries = () => {
  return fs.readdirSync('./src')
    .filter((file) => file.match(/.*\.js$/))
    .map((file) => {
      return {
        name: file.substring(0, file.length - 3),
        path: `./src/${file}`
      }
    }).reduce((memo, file) => {
      memo[file.name] = file.path
      return memo
    }, {})
}

// Vue CLI config
module.exports = {
  outputDir: 'assets',
  filenameHashing: false,
  configureWebpack: config => {
    // Deleting default entry
    delete config.entry.app

    //  Webpack alias
    config.resolve.alias['@'] = 'packages/'
    config.resolve.alias['vue$'] = 'vue/dist/vue.common.js'

    // Added new entries based on src files
    config.entry = getEntries()
  },
  chainWebpack: config => {
    // delete HTML related webpack plugins
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // Removing hash to img assets
    config.module
      .rule('images')
      .use('url-loader')
      .tap(options => Object.assign({}, options, { name: 'img/[name].[ext]' }))
  }
}
