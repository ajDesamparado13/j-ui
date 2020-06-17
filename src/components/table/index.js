import SimpleTable from './SimpleTable'

import { use, registerComponent } from '../plugins'

export {
  SimpleTable
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, SimpleTable)
  }
}
use(Plugin)

export default Plugin
