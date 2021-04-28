import mobile from 'freedom-js-support/src/utilities/mobile'
export const CancelationMethods = ['escape', 'x', 'outside', 'button']
export default {
  props: {
    props: {
      type: Object,
      required: false
    },
    events: {
      type: Object,
      required: false
    },
    animation: {
      type: String,
      default: 'zoom-out'
    },
    content: {
      type: String,
      default: ''
    },
    component: [Object, Function],
    container: HTMLElement,
    isProgrammatic: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    canCancel: {
      type: [Array, Boolean],
      default: () => CancelationMethods
    },
    position: {
      type: String,
      default: 'fixed'
    }
  },
  computed: {
    cancelOptions () {
      if (Array.isArray(this.canCancel)) return this.canCancel
      return this.canCancel ? CancelationMethods : []
    },
    showX () {
      return this.cancelOptions.indexOf('x') >= 0
    }
  },
  methods: {
    getEvents (btn) {
      return Object.keys(btn).reduce((events, key, index) => {
        if (typeof btn[key] === 'function') {
          events[key] = (event) => { btn[key](); this.close(event) }
        }
        return events
      }, { click: () => { this.close() } })
    },
    getProps (btn) {
      return Object.keys(btn).reduce((props, key, index) => {
        if (typeof btn[key] !== 'function') {
          props[key] = btn[key]
        }
        return props
      }, {})
    },
    cancel (method) {
      return this.cancelOptions.indexOf(method) < 0 ? null : this.close(method)
    },
    close (event = null) {
      this.$emit('close', event)
      if (this.isProgrammatic) {
        this.$destroy()
        this.removeElement(this.$el)
      }
    },
    removeElement (el) {
      if (typeof el.remove !== 'undefined') {
        el.remove()
      } else {
        el.parentNode.removeChild(el)
      }
    },
    onKeyPress (event) {
      if (event.keyCode !== 27) return
      this.cancel('escape')
    },
    mountToBody () {
      document.body.appendChild(this.$el)
    },
    mountToContainer () {
      let container = this.container
      if (container._isVue) {
        this.container = container.$el
      }
      this.previous_style = this.container.style
      if (!this.isProgrammatic) {
        this.container.style = 'position:relative;'
      }
      this.container.insertBefore(this.$el, this.container.firstChild)
    },
    addIOSSupport () {
      var iosVersion = mobile.version.iOS()
      if (iosVersion != null && iosVersion[0] < 11.3) {
        document.body.classList.add('ios-position-fixed')
      }
    },
    removeIOSSupport () {
      document.body.classList.remove('ios-position-fixed')
    }
  },
  beforeMount () {
    let container = this.container
    if (!container) return this.mountToBody()
    if (container._isVue) return container.$on('hook:mounted', this.mountToContainer)
    if (container instanceof HTMLElement) return this.mountToContainer()
    this.mountToBody()
  },
  created () {
    this.addIOSSupport()
    if (typeof window !== 'undefined') document.addEventListener('keyup', this.onKeyPress)
  },
  beforeDestroy () {
    this.removeIOSSupport()
    if (typeof window !== 'undefined') document.removeEventListener('keyup', this.onKeyPress)
    document.documentElement.classList.toggle('is-clipped', this.isActive)
    document.body.classList.toggle('is-noscroll', this.isActive)
  }
}
