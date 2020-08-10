import Radio from './Radio'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

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
