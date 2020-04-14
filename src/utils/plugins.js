export const use = (plugin) => {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
  }
}

export const registerComponent = (Vue, component) => {
  Vue.component(component.name, component)
}

export const registerComponentProgrammatic = (Vue, property, component) => {
  let name = `$${property}`;
  if (!Vue.prototype[name]) Vue.prototype[name]= {}
  Vue.prototype[name] = component
}
