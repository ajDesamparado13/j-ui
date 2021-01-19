import Arr from 'freedom-js-support/src/utilities/arr'
import DialogComponent from './Dialog'
import { use, registerComponent, registerComponentProgrammatic } from 'freedom-js-support/src/helpers/plugin'
import Vue from 'vue'

const DialogProgrammatic = {
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
  show (params) {
    return this.open(params)
  }
}

export const VUE_INSTALLER = {
  install (Vue, options) {
    let name = Arr.getProperty(options, 'name', 'dialog')
    registerComponent(Vue, DialogComponent)
    registerComponentProgrammatic(Vue, name, DialogProgrammatic)
  }
}

use(VUE_INSTALLER)
export default DialogProgrammatic
