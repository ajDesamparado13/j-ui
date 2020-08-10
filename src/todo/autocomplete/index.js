import autocomplete from './autocomplete'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, autocomplete)
  }

}
use(Plugin)
export default Plugin
