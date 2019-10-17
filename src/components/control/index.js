import Control from './Control'
import { use, registerComponent } from '@/utils/plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Control)
  }

}
use(Plugin)

export default Plugin
