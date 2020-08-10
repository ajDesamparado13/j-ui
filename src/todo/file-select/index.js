import FileSelect from './FileSelect'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, FileSelect)
  }

}
use(Plugin)

export default Plugin
