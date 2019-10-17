import Table from './Table'

import { use, registerComponent } from '@/utils/plugins'

export {
  Table
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Table)
  }
}
use(Plugin)

export default Plugin
