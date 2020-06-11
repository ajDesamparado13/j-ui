import Input from './Input'
import Textbox from './Textbox'
import Textarea from './Area'

import { use, registerComponent } from '../plugins'

export {
  Input,
  Textbox,
  Textarea
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Input)
    registerComponent(Vue, Textbox)
    registerComponent(Vue, Textarea)
  }

}
use(Plugin)

export default Plugin
