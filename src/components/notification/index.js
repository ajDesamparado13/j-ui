import Vue from 'vue'

import Notification from './Notification'

import { propSetter } from 'freedom-js-support/src/helpers/util'
import { use, registerComponentProgrammatic, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const NotificationProgrammatic = {
  newComponent (options) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const NotificationComponent = vm.extend(Notification)
    return new NotificationComponent(options)
  },
  clearOnRouteChange: true,
  default_time: 10000,
  container: '',
  focus: null,
  list: [],
  show (params) {
    params.container = params.container || this.container
    let propsData = propSetter(Notification.props, params)

    if (typeof params.container === 'undefined') {
      propsData.container = this.container
    }

    if (typeof params.time === 'undefined') {
      propsData.time = this.default_time
    }

    if (typeof params.focus === 'undefined') {
      propsData.focus = this.focus
    }

    var n = this.newComponent({ el: document.createElement('div'), propsData })
    n.$on('close', (uid) => {
      var list = this.list
      var find = list.findIndex((compo) => {
        return compo._uid === uid
      })
      if (find >= 0) {
        list.splice(find, 1)
      }
    })
    this.list.push(n)
    return n
  },
  preventDefault () {
    this.clearOnRouteChange = false
  },
  clear (event = '') {
    var list = this.list
    var length = list.length
    if (!this.clearOnRouteChange) {
      this.clearOnRouteChange = true
      return
    }
    for (var i = length - 1; i >= 0; i--) {
      var notification = list[i]
      switch (event) {
        case 'route-change':
          if (!notification.closeOnRouteChange) {
            continue
          }
          break
      }
      notification.close()
    }
  }
}
const Plugin = {
  install (Vue) {
    registerComponent(Vue, Notification)
    registerComponentProgrammatic(Vue, 'notification', NotificationProgrammatic)
  }

}

use(Plugin)
export default Plugin
