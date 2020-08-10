import FocusContainer from './FocusContainer'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, FocusContainer)
  }

}
use(Plugin)

export default Plugin
