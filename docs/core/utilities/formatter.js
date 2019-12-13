/*
 * ALL GET METHODS SHOULD RETURN ACTUAL PRIMARY DATA TYPE OF THE VALUE
 * ALL FORMAT METHODS SHOULD RETURN IN STRING VALUE
 * */
import formatter from '@src/utils/formatter'
export default function (Vue) {
  Vue.formatter = formatter
  Object.defineProperties(Vue.prototype, {
    $formatter: {
      get: () => {
        return Vue.formatter
      }
    }
  })
}
