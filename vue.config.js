const path = require('path')

// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/scss/_variables.scss";`
      }

    }

  }
}
