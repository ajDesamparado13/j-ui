import Radio from './Radio'

import { use, registerComponent } from '../../utils/plugins'

export {
    Radio
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Radio)
  }

}

use(Plugin)
export default Plugin
