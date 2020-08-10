import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

export {
  Dropdown,
  DropdownItem
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Dropdown)
  }
}
use(Plugin)
export default Plugin
