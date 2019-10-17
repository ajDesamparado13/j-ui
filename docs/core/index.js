import router from './router'

import dependencies from './dependencies'

const installer = {}
installer.install = (Vue, options) => {
  Vue.use(router, options.router)
  Vue.use(dependencies)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(installer)
}

export default installer
