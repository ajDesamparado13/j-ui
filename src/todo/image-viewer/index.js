import ImageViewer from './ImageViewer'

import { use, registerComponent } from 'freedom-js-support/src/helpers/plugin'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, ImageViewer)
  }

}
use(Plugin)

export default Plugin
