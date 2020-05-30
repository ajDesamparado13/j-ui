import ImageViewer from './ImageViewer'

import { use, registerComponent } from '../../utils/plugins'

const Plugin = {
  install (Vue) {
    registerComponent(Vue, ImageViewer)
  }

}
use(Plugin)

export default Plugin
