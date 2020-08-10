import Icon from './Icon'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Icon)
  }

}
use(Plugin)

export default Plugin
