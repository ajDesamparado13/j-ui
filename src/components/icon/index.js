import Icon from './Icon'

import { use, registerComponent } from '../plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Icon)
  }

}
use(Plugin)

export default Plugin
