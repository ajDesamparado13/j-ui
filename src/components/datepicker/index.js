import VCalendar from 'v-calendar'
import Datepicker from './Datepicker'
import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'
import defaults from './defaults';

const Plugin = {
  install (Vue,options) {
    Vue.use(VCalendar,options)
    registerComponent(Vue, Datepicker,Object.assign(defaults,options))
  }
}
use(Plugin)

export {
  Datepicker,
}

export default Plugin


