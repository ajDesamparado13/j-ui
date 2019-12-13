import Pager from './Pager'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Pager)
  }

}

use(Plugin)
export default Plugin
