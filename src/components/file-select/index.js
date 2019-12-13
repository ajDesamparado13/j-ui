import FileSelect from './FileSelect'
import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, FileSelect)
  }

}
use(Plugin)

export default Plugin
