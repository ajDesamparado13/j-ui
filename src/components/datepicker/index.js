import Datepicker from './Datepicker'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

export {
  Datepicker,
}

const Plugin = {
  install (Vue) {
    registerComponent(Vue, Datepicker)
  }
}
use(Plugin)
export default Plugin


