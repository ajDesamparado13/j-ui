import Navbar from './Navbar'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

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
