import Dropdown from './Dropdown'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

export {
  Dropdown,
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Dropdown)
  }
}
use(Plugin)
export default Plugin

