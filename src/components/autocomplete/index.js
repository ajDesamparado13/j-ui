import autocomplete from './autocomplete'
import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, autocomplete)
  }

}
use(Plugin)
export default Plugin
