import SimpleTable from './SimpleTable'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

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
