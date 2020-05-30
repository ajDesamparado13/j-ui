import Collapse from './Collapse'
import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Collapse)
  }

}
use(Plugin)

export { Collapse }
export default Plugin
