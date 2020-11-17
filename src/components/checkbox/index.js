import Checkbox from './Checkbox'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Checkbox)
  }

}
use(Plugin)

export default Plugin
