import Vue from 'vue'

import Notification from './Notification'

import { use, registerComponentProgrammatic, registerComponent } from '../plugins'

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
  show (props) {
    if (typeof props !== 'object') {
      props = { message: props }
    }
    // container is required when using programmatic trigger
    if (!this.container) {
      // retry again in 2 seconds for cases
      // when container is not yet mounted
      setTimeout(() => { this.show(props) }, 2000)
      return
    }

    var propsData = Object.assign({
      isProgrammatic: true,
      focus: this.focus,
      time: this.default_time,
      container: this.container
    }, props)

    var n = this.newComponent({ el: document.createElement('div'), propsData })
    n.$on('close', (uid) => {
      var list = this.list
      var find = list.findIndex((compo) => {
        return compo._uid == uid
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
