import Arr from 'freedom-js-support/src/utilities/arr'
import DialogComponent from './Dialog'
import { use, registerComponent, registerComponentProgrammatic } from 'freedom-js-support/src/helpers/plugin'
import Vue from 'vue'

import { CancelationMethods } from '../BaseModal'
const DialogProgrammatic = {
  confirmText: 'OK',
  cancelText: 'CANCEL',
  canCancel: CancelationMethods,
  position: 'fixed',
  newComponent (options = {}) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const DialogClass = vm.extend(DialogComponent)
    return new DialogClass(options)
  },
  open (params) {
    let parent = Arr.getProperty(params, 'parent', undefined)
    if (params.parent) { delete params.parent }

    const defaultParam = {
      isActive: true,
      isProgrammatic: true,
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
  },
  info (params) {
    let confirmText = Arr.getProperty(params, 'confirmText', this.confirmText)
    return new Promise((resolve, reject) => {
      let config = Object.assign({
        buttons: [
          { text: confirmText }
        ]
      }, params)
      this.open(config).$on('close', () => {
        setTimeout(() => { resolve() }, 250)
      })
    })
  },
  confirm (params = {}) {
    let confirmText = Arr.getProperty(params, 'confirmText', this.confirmText)
    let cancelText = Arr.getProperty(params, 'cancelText', this.cancelText)
    return new Promise((resolve, reject) => {
      let value = false
      let config = Object.assign({
        buttons: [
          { text: cancelText },
          { text: confirmText, click: () => { value = true } }
        ]
      }, params)
      this.open(config).$on('close', () => {
        setTimeout(() => { resolve(value) }, 250)
      })
    })
  }
}

const Plugin = {
  install (Vue, options) {
    let name = Arr.getProperty(options, 'name', 'dialog')
    Object.keys(DialogProgrammatic).forEach((key) => {
      let isFunction = typeof DialogProgrammatic[key] === 'function'
      let hasOption = options.hasOwnProperty(key)
      if (!isFunction && hasOption) {
        DialogProgrammatic[key] = options[key]
      }
    })
    registerComponent(Vue, DialogComponent)
    registerComponentProgrammatic(Vue, name, DialogProgrammatic)
  }
}
use(Plugin)

export {
  DialogComponent,
  DialogProgrammatic,
  CancelationMethods
}

export default Plugin
