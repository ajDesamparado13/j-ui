import VCalendar from 'v-calendar'
import Datepicker from './Datepicker'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

export {
  Datepicker,
}

const Plugin = {
  install (Vue,options) {
    Vue.use(VCalendar,options)
    registerComponent(Vue, Datepicker)
  }
}
use(Plugin)
export default Plugin


