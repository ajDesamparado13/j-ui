const path = require('path')

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint')
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/scss/_variables.scss";`
      }

    }

  }
}
