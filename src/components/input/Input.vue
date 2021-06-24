<template>
    <input class="ui-input input"
        v-on="$listeners"
        v-bind="$attrs"
        :type="type"
        :value="newValue"
        @keypress.enter="onEnter"
        >
</template>

<script>
import Formatter from 'freedom-js-support/src/utilities/formatter'
import Masks from 'freedom-js-support/src/utilities/masks'
export default {
  name: 'ui-input',
  model: { prop: 'value', event: 'update' },
  data () {
    return {
      preventUpdate: false,
      initialValue: this.value,
      newValue: '',
      targetValue: ''
    }
  },
  props: {
    preventKeys: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: [String, Number],
      required: false
    },
    replaceOnInput: { type: Boolean, default: false },
    filters: {
      type: Array,
      required: false
    },
    value: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text' // all the possible HTML5 input types, except those that have a special UI
    },
    format: {
      type: String,
      default: 'text' // text,number,decimal,date|option
    }
  },
  computed: {
    formatObject () {
      return Formatter.getObjectParameters(this.format, { value: this.targetValue })
    }
  },
  methods: {
    isEmpty (value) {
      return Formatter.isEmpty(value)
    },
    onEnter (e) {
      this.setValue(e.target.value)
      this.$nextTick(() => {
        this.$emit('keydown-enter', e)
      })
    },
    onKeydown (event) {
      let key = Masks.only.getKey(event)

      if (Masks.only.is_special_key(key)) {
        return
      }
      var value = event.target.value
      var maxlength = this.maxlength
      if (maxlength && value.length >= maxlength) {
        return event.preventDefault()
      }
      let { format, options } = this.formatObject
      switch (format) {
        case 'digit': return Masks.only.digit_keys(event, options)
        case 'number': return Masks.only.number_keys(event, options)
        case 'decimal': return Masks.only.decimal_keys(event, options)
        case 'password': return Masks.only.password_keys(event, options)
      }
      if (format.indexOf('date') >= 0) {
        return Masks.only.date_keys(event)
      }
    },
    updateValue (event) {
      if (event === undefined) {
        return
      }
      this.$nextTick(() => {
        var value = event.target.value
        var key = value[value.length - 1]
        this.targetValue = value
        this.setValue(value, key)
      })
    },
    applyFilters (value) {
      let filters = Array.isArray(this.filters) ? this.filters : []
      filters.forEach((filter) => {
        switch (filter.toLowerCase()) {
          case 'tohalfwidth' : value = Formatter.toHalfWidth(value); break
          case 'uppercase': value = value.toUpperCase(); break
          case 'lowercase': value = value.toLowerCase(); break
        }
      })
      return value
    },
    setValue (value, key) {
      if (this.isEmpty(value)) { this.newValue = ''; return }

      value = this.applyFilters(value)

      if (this.maxlength) {
        value = value.substring(0, Number(this.maxlength))
      }

      var { format, options } = this.formatObject
      if (format === 'text') {
        this.newValue = value
      }
      this.newValue = Formatter.format(value, format, options)
      this.$forceUpdate()
    },
    /*
         * Get the unformatted value
         */
    getRaw (value) {
      var { format, options } = this.formatObject
      if (!(format === 'text' || this.type !== 'text')) { return Formatter.getValue(value, format, options) }
      return value
    },
    clear () {
      this.preventUpdate = true
      this.newValue = ''
      this.$nextTick(() => { this.preventUpdate = false })
    },
    reset () {
      if (document.activeElement === this.$el) document.activeElement.blur()
      this.setValue(this.initialValue)
    },
    addEventListeners () {
      this.$el.addEventListener('input', this.updateValue)
      if (this.preventKeys && this.format != 'text') this.$el.addEventListener('keydown', this.onKeydown)
      if (this.replaceOnInput) this.$el.addEventListener('focus', this.$el.select)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        var val = this.isEmpty(value) ? value : this.getRaw(value)
        if (this.getRaw(this.newValue) !== val) {
          this.setValue(val)
        }
      }
    },
    newValue (value) {
      var val = this.isEmpty(value) ? value : this.getRaw(value)
      if (val !== this.getRaw(this.value) && !this.preventUpdate) {
        this.$emit('update', val)
      }
    }
  },
  mounted () {
    this.addEventListeners()
  }
}
</script>
