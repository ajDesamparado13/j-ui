export const make = {
  getConfig (_config, key) {
    let config = typeof _config === 'object' ? _config : {}
    if (config.hasOwnProperty(key)) {
      return config[key]
    }
    return config
  },
  events (_config, params) {
    let config = this.getConfig(_config)
    return Object.keys(config).reduce((events, key) => {
      if (typeof config[key] === 'function') {
        events[key] = () => { config[key](params) }
      }
      return events
    }, {})
  },
  component (config, defaultComponent, params = {}) {
    if (!config || !config.component) {
      return defaultComponent
    }
    if (typeof config.component === 'function') {
      return config.component(params)
    }
    return config.component || defaultComponent
  },
  props (config, defaults = {}) {
    let props = config.props || {}
    props.class = this.mergeClasses(props.class, defaults.class)
    return Object.assign(defaults, props)
  },
  mergeClasses (target, defaults) {
    let makeClassObject = (classProp) => {
      if (!classProp || (typeof classProp === 'object' && !Array.isArray(classProp))) {
        return {}
      }

      if (typeof classProp === 'string') {
        classProp = classProp.split(' ')
      }

      if (Array.isArray(classProp)) {
        return classProp.reduce((result, item, index, array) => {
          result[item] = true
          return result
        }, {})
      }
      return classProp
    }
    return Object.assign(makeClassObject(defaults), makeClassObject(target))
  }
}
