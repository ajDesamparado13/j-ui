import Vue from 'vue'
import Block from './Block'
import { use, registerComponentProgrammatic, registerComponent } from '../plugins'

const BlockProgrammatic = {
  newComponent (options = {}) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const BlockComponent = vm.extend(Block)
    return new BlockComponent(options)
  },
  show (props = {}) {
    var propsData = {
      message: props.message ? props.message : '',
      type: props.type ? props.type : 'indeterminate',
      container: props.container ? props.container : null
    }
    return this.newComponent({
      el: document.createElement('div'),
      propsData
    })
  }
}
const Plugin = {
  install (Vue) {
    registerComponent(Vue, Block)
    registerComponentProgrammatic(Vue, 'block', BlockProgrammatic)
  }

}

export default Plugin
export { Block }
