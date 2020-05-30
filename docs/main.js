import Vue from 'vue'
import moment from 'moment'
import App from './App'

import routes from './pages'

import installer from './core'
import components from '../src'

window.Vue = Vue
moment.locale('ja')

Vue.config.productionTip = false

var options = {
  render: h => h(App)
}
var progress = null
const config = {
  router: {
    routes,
    attachTo: options,
    beforeEach: (to, from, next, router) => {
      if (progress) {
        progress = progress.close()
        progress = null
      }
      if (to.name != from.name) {
        // progress = router.app.$progress.show()
      }
    },
    afterEach: (router) => {
      if (progress) {
        progress = progress.close()
        progress = null
      }
    }

  }
}

Vue.use(components)
Vue.use(installer, config)

var app = new Vue(options)
options.router.onReady(() => {
  app.$mount('#app')
})
