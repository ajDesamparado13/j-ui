import components from './components'

import config, { setOptions } from './components/config'
import { registerComponentProgrammatic } from './components/plugins'

const UI = {
  install (Vue, options = {}) {
    console.log(components)
    // Options
    setOptions(Object.assign(config, options))
    // Components
    for (let componentKey in components) {
      let installer = components[componentKey]
      if (installer && installer['install']) {
        Vue.use(installer)
      }
    }
    console.log(components)
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
