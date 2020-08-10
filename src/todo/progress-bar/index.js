import Vue from 'vue'
import ProgressBar from './ProgressBar'
import { use, registerComponentProgrammatic } from 'freedom-js-support/src/helpers/plugin'

export { ProgressBar }
const ProgressProgrammatic = {
  show (message = '', type = 'indeterminate') {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const propsData = { message, type }
    const ProgressBarComponent = vm.extend(ProgressBar)
    return new ProgressBarComponent({
      el: document.createElement('div'),
      propsData
    })
  }
}

const Plugin = {
  install (Vue) {
    registerComponentProgrammatic(Vue, 'progress', ProgressProgrammatic)
  }
}

use(Plugin)

export default Plugin
