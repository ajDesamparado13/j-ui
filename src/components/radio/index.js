import Radio from './Radio'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'
import defaults from './defaults'

export {
  Radio
}

const Plugin = {
  install (Vue, options) {
    registerComponent(Vue, Radio, Object.assign(defaults, options))
  }

}

use(Plugin)
export default Plugin
