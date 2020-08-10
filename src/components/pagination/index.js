import Pagination from './Pagination'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Pagination)
  }

}

use(Plugin)
export default Plugin
