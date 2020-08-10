import Select from './Select'
import Pick from './Pick'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

export {
  Select,
  Pick
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Select)
    registerComponent(Vue, Pick)
  }
}
use(Plugin)

export default Plugin
