const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint')
    config.resolve.alias.set('@docs', resolve('docs'))
    config.resolve.alias.set('@src', resolve('src'))
    console.log(resolve('src'))
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/scss/_imports.scss";`
      }
    }
  }
}
