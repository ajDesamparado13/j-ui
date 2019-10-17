import * as components from './components'

import config, { setOptions } from './utils/config'
import { registerComponentProgrammatic } from './utils/plugins'

const UI = {
  install (Vue, options = {}) {
    // Options
    setOptions(Object.assign(config, options))
    // Components
    for (let componentKey in components) {
      Vue.use(components[componentKey])
    }
    // Config component
    const UIProgrammatic = {
      setOptions (options) {
        setOptions(Object.assign(config, options))
      }
    }
    registerComponentProgrammatic(Vue, 'config', UIProgrammatic)
  }
}

export default UI

// export all components as vue plugin
export { components }
