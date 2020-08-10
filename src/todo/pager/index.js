import Pager from './Pager'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Pager)
  }

}

use(Plugin)
export default Plugin
