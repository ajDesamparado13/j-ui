import Vue from 'vue'
import moment from 'moment'

import App from './App'

import routes from './views'

import installer from './core'
moment.locale('ja')

Vue.config.productionTip = false

var options = {
  render: h => h(App)
}
const config = {
  router: {
    routes,
    attachTo: options
  }
}
Vue.use(installer, config)

var app = new Vue(options)
options.router.onReady(() => {
  app.$mount('#app')
})
