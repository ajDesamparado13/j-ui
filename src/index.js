import components from './components'

import config, { setOptions } from './components/config'
import { registerComponentProgrammatic } from 'freedom-js-support/src/helpers/plugin'

const UI = {
  install (Vue, options = {}) {
    // Options
    setOptions(Object.assign(config, options))
    // Components
    for (let componentKey in components) {
      let installer = components[componentKey]
      if (installer && installer['install']) {
        Vue.use(installer)
      }
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
