import Arr from 'freedom-js-support/src/utilities/arr'
import DialogComponent from './Dialog'
import { use, registerComponent, registerComponentProgrammatic } from 'freedom-js-support/src/helpers/plugin'
import Vue from 'vue'

import { CancelationMethods } from '../BaseModal'
const DialogProgrammatic = {
  appQuerySelector: '#app',
  inheritOptions: ['directives', 'store', 'router', 'computed', 'filters'],
  confirmText: 'OK',
  cancelText: 'CANCEL',
  canCancel: CancelationMethods,
  position: 'fixed',
  newComponent (options = {}) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const app = document.querySelector(this.appQuerySelector)
    let $options = Arr.getProperty(app, '__vue__.$options', {})
    Object.keys($options).forEach((key) => {
      if (this.inheritOptions.includes(key)) options[key] = $options[key]
    })
    const DialogClass = vm.extend(DialogComponent)
    return new DialogClass(options)
  },
  create (params) {
    return new Promise((resolve, reject) => {
      let parent = Arr.getProperty(params, 'parent', undefined)
      if (params.parent) { delete params.parent }

      const defaultParam = {
        isActive: true,
        isProgrammatic: true,
        canCancel: this.canCancel,
        position: this.position,
        content: typeof params === 'string' ? params : Arr.getProperty(params, 'content', '')
      }

      setTimeout(() => {
        resolve(this.newComponent({
          parent,
          el: document.createElement('div'),
          propsData: Object.assign(defaultParam, params)
        }))
      }, 100)
    })
  },
  open (params) {
    return this.create(params)
  },
  show (params) {
    return this.open(params)
  },
  info (params) {
    let confirmText = Arr.getProperty(params, 'confirmText', this.confirmText)
    return new Promise(async (resolve, reject) => {
      let config = Object.assign({
        buttons: [
          { text: confirmText }
        ]
      }, params)
      let dialog = await this.open(config)
      dialog.$on('close', () => {
        setTimeout(() => { resolve() }, 250)
      })
    })
  },
  confirm (params = {}) {
    let confirmText = Arr.getProperty(params, 'confirmText', this.confirmText)
    let cancelText = Arr.getProperty(params, 'cancelText', this.cancelText)
    return new Promise(async (resolve, reject) => {
      let value = false
      let config = Object.assign({
        buttons: [
          { text: cancelText },
          { text: confirmText, click: () => { value = true } }
        ]
      }, params)
      let dialog = await this.open(config)
      dialog.$on('close', () => {
        setTimeout(() => { resolve(value) }, 250)
      })
    })
  }
}

const Plugin = {
  install (Vue, options = {}) {
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
