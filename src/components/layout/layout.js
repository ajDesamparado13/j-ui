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
    resizeContent (width = null, height = null) {
      this.$nextTick(() => {
        if (this.$refs['header']) {
          /* eslint-disable-next-line */
          height = height ? height : this.$refs["header"].$el.clientHeight;
          /* eslint-disable-next-line */
          width = width ? width : this.$refs["header"].$el.clientWidth;
        }
        this.height = height
        this.width = width
      })
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
