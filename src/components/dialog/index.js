import Arr from 'freedom-js-support/src/utilities/arr'
import DialogComponent from './Dialog'
import { use, registerComponent, registerComponentProgrammatic } from 'freedom-js-support/src/helpers/plugin'
import Vue from 'vue'

const DialogProgrammatic = {
  confirmText: 'OK',
  cancelText: 'CANCEL',
  confirm (params) {
    let onConfirm = Arr.getProperty(params, 'onConfirm', () => {})
    let confirmText = Arr.getProperty(params, 'confirmText', this.confirmText)
    let onCancel = Arr.getProperty(params, 'onCancel', () => {})
    let cancelText = Arr.getProperty(params, 'cancelText', this.cancelText)

    let config = Object.assign({
      buttons: [
        { text: cancelText, click: onCancel },
        { text: confirmText, click: onConfirm }
      ]
    }, params)
    return this.open(config)
  },
  newComponent (options = {}) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const DialogClass = vm.extend(DialogComponent)
    return new DialogClass(options)
  },
  open (params) {
    let content = typeof params === 'string' ? params : Arr.getProperty(params, 'content', '')
    let parent = null
    if (Arr.hasProperty(params, 'parent')) {
      parent = Arr.getProperty(params, 'parent', null)
      delete params.parent
    }

    const defaultParam = {
      isProgrammatic: true,
      content
    }

    let store = null
    if (Arr.hasProperty(params, 'store')) {
      store = Arr.getProperty(params, 'store', null)
      delete params.store
    }

    const propsData = Object.assign(defaultParam, params)
    let comp = this.newComponent({
      parent,
      el: document.createElement('div'),
      propsData,
      store
    })
    return comp
  },
  info (params) {
    return this.open(params)
  },
  show (params) {
    return this.open(params)
  }
}

const Plugin = {
  install (Vue, options) {
    let name = Arr.getProperty(options, 'name', 'dialog')
    registerComponent(Vue, DialogComponent)
    registerComponentProgrammatic(Vue, name, DialogProgrammatic)
  }
}
use(Plugin)

export {
  DialogComponent,
  DialogProgrammatic
}

export default Plugin
