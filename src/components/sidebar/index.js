import Sidebar from './Sidebar'

import { use, registerComponent } from '@/utils/plugins'

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
