import Button from './Button'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Button)
  }

}
use(Plugin)

export default Plugin
