import Vue from 'vue'
import Block from './Block'
import { use, registerComponentProgrammatic, registerComponent } from '../plugins'

const BlockProgrammatic = {
  newComponent (options = {}) {
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue
    const BlockComponent = vm.extend(Block)
    return new BlockComponent(options)
  },
  show (params = {}) {
    let props = Block.props;
    let propsData = {}
    for(let key in props){
        let prop = props[key];
        propsData[key] =  typeof params[key] == 'undefined' ? prop.default : params[key]
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
