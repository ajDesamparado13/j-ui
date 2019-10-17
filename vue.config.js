const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint')
    config.resolve.alias.set('@docs', resolve('docs'))
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/scss/_imports.scss";`
      }
    }
  }
}
