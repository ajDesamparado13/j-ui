import Arr from 'freedom-js-support/src/utilities/arr'
import ModalComponent from './Modal'
import { use, registerComponent, registerComponentProgrammatic } from 'freedom-js-support/src/helpers/plugin'
import Vue from 'vue'

import { CancelationMethods } from '../BaseModal'
const ModalProgrammatic = {
  appQuerySelector: '#app',
  canCancel: CancelationMethods,
  position: 'fixed',
  newComponent (options = {}) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const ModalClass = vm.extend(ModalComponent)
    return new ModalClass(options)
  },
  open (params) {
    let parent = Arr.getProperty(params, 'parent', undefined)
    if (params.parent) { delete params.parent }

    const defaultParam = {
      isProgrammatic: true,
      isActive: true,
      canCancel: this.canCancel,
      position: this.position,
      content: typeof params === 'string' ? params : Arr.getProperty(params, 'content', '')
    }

    return this.newComponent({
      parent,
      el: document.createElement('div'),
      propsData: Object.assign(defaultParam, params)
    })
  },
  show (params) {
    return this.open(params)
  }
}

const Plugin = {
  install (Vue, options) {
    let name = Arr.getProperty(options, 'name', 'dialog')
    Object.keys(ModalProgrammatic).forEach((key) => {
      let isFunction = typeof ModalProgrammatic[key] === 'function'
      let hasOption = options.hasOwnProperty(key)
      if (!isFunction && hasOption) {
        ModalProgrammatic[key] = options[key]
      }
    })
    registerComponent(Vue, ModalComponent)
    registerComponentProgrammatic(Vue, name, ModalProgrammatic)
  }
}
use(Plugin)

export default Plugin
