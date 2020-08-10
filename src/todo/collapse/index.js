import Collapse from './Collapse'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Collapse)
  }

}
use(Plugin)

export { Collapse }
export default Plugin
