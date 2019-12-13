import masks from '@/utils/masks'
export default function (Vue) {
  Vue.masks = masks
  Object.defineProperties(Vue.prototype, {
    $masks: {
      get: () => {
        return Vue.masks
      }
    }
  })
}
