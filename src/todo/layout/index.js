import column1 from './column_1'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, column1)
  }
}
use(Plugin)

export default Plugin
