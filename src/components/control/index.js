import Control from './Control'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Control)
  }

}
use(Plugin)

export default Plugin
