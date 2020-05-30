import Pagination from './Pagination'

import { use, registerComponent } from '../plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Pagination)
  }

}

use(Plugin)
export default Plugin
