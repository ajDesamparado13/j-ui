import Button from './Button'
import { use, registerComponent } from '../plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Button)
  }

}
use(Plugin)

export default Plugin
