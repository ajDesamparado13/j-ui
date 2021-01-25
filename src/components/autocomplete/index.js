
import Autocomplete from './Autocomplete'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

export {
  Autocomplete
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Autocomplete)
  }
}
use(Plugin)
export default Plugin
