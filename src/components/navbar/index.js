import Navbar from './Navbar'

import { use, registerComponent } from '@/utils/plugins'

export {
  Navbar
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Navbar)
  }

}
use(Plugin)

export default Plugin
