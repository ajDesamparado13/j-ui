<template>
  <button
    class="ui-button"
    @click="onClick"
    v-bind="$attrs"
    v-on="$listeners"
    :disabled="is_disabled"
    :class="classes"
  >
    <span v-if="is_loading && loadingText">{{ loadingText }}</span>
    <slot v-else></slot>
  </button>
</template>

<script>
import config from '../config'
export default {
  name: 'ui-button',
  data () {
    return {
      handler_loading: false
    }
  },
  props: {
    loadingText: {
      type: String,
      required: false
    },
    model: {
      required: false
    },
    color: {
      type: String,
      default: 'primary' // 'default', 'primary', 'accent', 'green', 'orange', or 'red'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handler: {
      type: Function,
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    defaultClass: {
      type: String,
      default: config.defaultButton.class
    },
    noDefaultClass: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    is_loading () {
      return this.handler_loading || this.loading
    },
    is_disabled () {
      return this.is_loading || this.disabled
    },
    classes () {
      var classes = [
        { 'is-loading': this.is_loading },
        { 'is-disabled': this.is_disabled }
      ]
      if (this.color) {
        classes.push(`is-${this.color}`)
      }
      if (!this.noDefaultClass) {
        classes.unshift(this.defaultClass)
      }
      return classes
    }
  },
  methods: {
    async onClick () {
      if (typeof this.handler !== 'function') {
        return
      }

      this.handler_loading = true
      var promise = this.handler(this.model)

      if (promise && typeof promise.then === 'function') {
        await promise
      }

      this.handler_loading = false
    }
  }
}
</script>
