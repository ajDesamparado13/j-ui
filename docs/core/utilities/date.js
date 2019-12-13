import dateUtil from '@/utils/date'

export default function (Vue) {
  Vue.date = dateUtil
  Object.defineProperties(Vue.prototype, {
    $date: {
      get: () => {
        return Vue.date
      }
    }
  })
}
