export default {
  data () {
    return {
      width: null,
      height: null
    }
  },
  props: {
    dynamicWidth: {
      type: Boolean,
      default: false
    },
    routerView: {
      type: Object,
      default: () => {
        return { class: 'router-view container is-fullhd' }
      }
    },
    content: {
      type: Object,
      default: () => {
        return {}
      }
    },
    sidebar: {
      type: Object,
      default: () => {
        return {}
      }
    },
    header: {
      type: Object,
      default: () => {
        return {}
      }
    },
    footer: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    content_style () {
      if (this.dynamicWidth && this.width) {
        return `max-width:${this.width}px`
      }

      return ''
    }
  },
  methods: {
    resizeContent (event, width = null, height = null) {
      if (this.$refs['header']) {
        height = Number(height) > 0 ? height : this.$refs['header'].$el.clientHeight
        width = Number(width) > 0 ? width : this.$refs['header'].$el.clientWidth
        this.height = height
        this.width = width
        this.$bus.emit('window-resize', { event, width, height })
      }
    }
  },
  mounted () {
    if (this.dynamicWidth) {
      window.addEventListener('resize', this.resizeContent, false)
    }
  },
  beforeDestroy () {
    if (this.dynamicWidth) {
      window.removeEventListener('resize', this.resizeContent)
    }
  }
}
