import Sidebar from './Sidebar'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

export {
  Sidebar
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Sidebar)
  }
}
use(Plugin)

export default Plugin
