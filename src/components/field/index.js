import Field from './Field'
import FieldGroup from './FieldGroup'

import { use, registerComponent } from '@/utils/plugins'

export {
  FieldGroup,
  Field
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, FieldGroup)
    registerComponent(Vue, Field)
  }

}
use(Plugin)

export default Plugin
