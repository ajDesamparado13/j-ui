import column1 from './column_1'
import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, column1)
  }
}
use(Plugin)

export default Plugin
