import Select from './Select'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

export {
  Select
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Select)
  }
}
use(Plugin)
export default Plugin
