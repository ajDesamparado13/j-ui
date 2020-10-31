import Arr from 'freedom-js-support/src/utilities/arr'
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

export const make = {
  events (_config, params) {
    let config = Arr.getProperty(_config, 'events', {})
    let keys = Object.keys(config)
    return keys.length <= 0 ? {} : keys.reduce((events, key) => {
      if (typeof config[key] === 'function') {
        events[key] = (event) => { config[key](Object.assign(params, event)) }
      }
      return events
    }, {})
  },
  component (_config, defaultComponent, params = {}) {
    let component = Arr.getProperty(_config, 'component', defaultComponent)
    return typeof component === 'function' ? component(params) : component
  },
  props (config, defaults = {}) {
    let props = Object.assign({}, Arr.getProperty(config, 'props', {}))
    props.class = this.mergeClasses(props.class, defaults.class)
    return Object.assign(defaults, props)
  },
  mergeClasses (target, defaults) {
    return Object.assign(toClassObject(defaults), toClassObject(target))
  }
}
