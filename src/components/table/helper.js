export const toClassObject = (classProp) => {
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

export const getProperty = (_config, key, defaultValue) => {
  let config = typeof _config === 'object' ? _config : {}
  if (config.hasOwnProperty(key)) {
    return config[key] || defaultValue
  }
  return defaultValue
}

export const make = {
  events (_config, params) {
    let config = getProperty(_config, 'events', {})
    return Object.keys(config).reduce((events, key) => {
      if (typeof config[key] === 'function') {
        events[key] = () => { config[key](params) }
      }
      return events
    }, {})
  },
  component (_config, defaultComponent, params = {}) {
    let component = getProperty(_config, 'component', defaultComponent)
    return typeof component === 'function' ? component(params) : component
  },
  props (config, defaults = {}) {
    let props = getProperty(config, 'props', {})
    props.class = this.mergeClasses(props.class, defaults.class)
    return Object.assign(defaults, props)
  },
  mergeClasses (target, defaults) {
    return Object.assign(toClassObject(defaults), toClassObject(target))
  }
}
