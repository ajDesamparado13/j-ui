import FocusContainer from './FocusContainer'
import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, FocusContainer)
  }

}
use(Plugin)

export default Plugin
