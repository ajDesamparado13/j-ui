import RippleInk from './RippleInk'
const Plugin = {
  install (Vue) {
    Vue.component(RippleInk.name, RippleInk)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}

export default Plugin
export {
  Plugin

}
