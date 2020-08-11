<template>
    <transition :name="animation">
        <div v-if="isActive" class="ui-modal modal is-active">
            <div class="modal-background" @click="cancel('outside')"/>
            <div
                class="animation-content box"
                ref="content"
                :class="{ 'modal-content': !hasModalCard }"
                :style="contentStyle"
                >
                <component
                    v-if="component"
                    v-bind="props"
                    v-on="events"
                    :is="component"
                    @close="close"/>
                <div
                    v-else-if="content"
                    v-html="content"/>
                <slot v-else/>
            </div>
                <button class="modal-close is-large" v-if="false" @click="cancel('x')" type="button">X</button>
            </div>
        </div>
    </transition>
</template>

<script>
import mobile from 'freedom-js-support/src/utilities/mobile'
export default {
  name: 'ui-modal',
  props: {
    active: Boolean,
    component: [Object, Function],
    content: String,
    programmatic: Boolean,
    props: Object,
    events: Object,
    width: {
      type: [String, Number],
      default: 1024
    },
    hasModalCard: Boolean,
    animation: {
      type: String,
      default: 'zoom-out'
    },
    canCancel: {
      type: [Array, Boolean],
      default: () => ['escape', 'x', 'outside', 'button']
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    scroll: {
      type: String,
      default: () => {
        return 'clip'
      },
      validator: (value) => {
        return [
          'clip',
          'keep'
        ].indexOf(value) >= 0
      }
    },
    contentStyle: {
      required: false
    }
  },
  data () {
    return {
      isActive: this.active || false,
      savedScrollTop: null,
      newWidth: typeof this.width === 'number'
        ? this.width + 'px'
        : this.width
    }
  },
  computed: {
    cancelOptions () {
      return typeof this.canCancel === 'boolean'
        ? this.canCancel
          ? ['escape', 'x', 'outside', 'button']
          : []
        : this.canCancel
    },
    showX () {
      return this.cancelOptions.indexOf('x') >= 0
    }
  },
  watch: {
    active (value) {
      this.isActive = value
    },
    isActive () {
      this.handleScroll()
    }
  },
  methods: {
    handleScroll () {
      if (typeof window === 'undefined') return

      if (this.scroll === 'clip') {
        document.documentElement.classList.toggle('is-clipped', this.isActive)
        return
      }

      this.savedScrollTop = !this.savedScrollTop
        ? document.documentElement.scrollTop
        : this.savedScrollTop

      document.body.classList.toggle('is-noscroll', this.isActive)

      if (this.isActive) {
        document.body.style.top = `-${this.savedScrollTop}px`
        return
      }

      document.documentElement.scrollTop = this.savedScrollTop
      document.body.style.top = null
      this.savedScrollTop = null
    },

    /**
         * Close the Modal if canCancel and call the onCancel prop (function).
         */
    cancel (method) {
      if (this.cancelOptions.indexOf(method) < 0) return

      this.onCancel.apply(null, arguments)
      return this.close(method)
    },

    /**
         * Call the onCancel prop (function).
         * Emit events, and destroy modal if it's programmatic.
         */
    close () {
      this.$emit('close')
      this.$emit('update:active', false)

      // Timeout for the animation complete before destroying
      if (this.programmatic) {
        this.isActive = false
        this.$destroy()
        this.removeElement(this.$el)
      }
      return null
    },
    removeElement (el) {
      if (typeof el.remove !== 'undefined') {
        el.remove()
      } else {
        el.parentNode.removeChild(el)
      }
    },
    /**
         * Keypress event that is bound to the document.
         */
    keyPress (event) {
      // Esc key
      if (event.keyCode === 27) this.cancel('escape')
    }
  },
  created () {
    var iosVersion = mobile.version.iOS()
    if (iosVersion != null && iosVersion[0] < 11.3) {
      document.body.classList.add('ios-position-fixed')
    }
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress)
    }
  },
  beforeMount () {
    // Insert the Modal component in body tag
    // only if it's programmatic
    this.programmatic && document.body.children[0].appendChild(this.$el)
  },
  mounted () {
    if (this.programmatic) this.isActive = true
    else if (this.isActive) this.handleScroll()
  },
  beforeDestroy () {
    document.body.classList.remove('ios-position-fixed')
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress)
    }
    document.documentElement.classList.toggle('is-clipped', this.isActive)
    document.body.classList.toggle('is-noscroll', this.isActive)
  }
}
</script>
