import Vue from 'vue'

import Modal from './Modal'
import { use, registerComponentProgrammatic } from '../../utils/plugins'

const modalProgrammatic = {
  newComponent (options = {}) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const ModalComponent = vm.extend(Modal)
    return new ModalComponent(options)
  },
  open (params) {
    let content
    let parent
    if (typeof params === 'string') content = params

    const defaultParam = {
      programmatic: true,
      content

    }
    if (params.parent) {
      parent = params.parent
      delete params.parent
    }

    var store = {}
    if (typeof params.store !== 'undefined') {
      store = params.store
      delete params.store
    }
    const propsData = Object.assign(defaultParam, params)
    return this.newComponent({
      parent,
      el: document.createElement('div'),
      propsData,
      store
    })
  }
}

export { Modal }

const Plugin = {
  install (Vue) {
    registerComponentProgrammatic(Vue, 'modal', modalProgrammatic)
  }
}
use(Plugin)

export default Plugin
