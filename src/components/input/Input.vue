<template>
    <input
        class="input"
        v-on="$listeners"
        v-bind="$attrs"
        :type="type"
        :value="newValue"
        @keypress.enter="onEnter"
        >
</template>

<script>
import config from '../config'
import formatter from '../../utils/formatter'
import masks from '../../utils/masks'
export default {
  name: 'ui-input',
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    return {
      preventUpdate: false,
      initialValue: this.value,
      key: null,
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
    toHalfWidth: { type: Boolean, default: false },
    isLowercase: { type: Boolean, default: false },
    isUppercase: { type: Boolean, default: false },
    defaultInputClass: {
      type: String,
      default: config.defaultInputClass
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
    },
    beforeUpdate: {
      type: Function,
      required: false
    },
    beforeEnter: {
      type: Function,
      required: false
    }
  },
  computed: {
    formatObject () {
      return formatter.getObjectParameters(this.format, { value: this.targetValue })
    }

  },
  methods: {
    isEmpty (value) {
      return formatter.isEmpty(value)
    },
    onEnter (e) {
      var value = e.target.value
      if (typeof this.beforeEnter === 'function') {
        value = this.beforeEnter(value)
      }
      this.setValue(value)
      this.$nextTick(() => {
        this.$emit('keydown-enter', e)
      })
    },
    onKeydown (event) {
      let key = masks.only.getKey(event)

      if (masks.only.is_special_key(key)) {
        return
      }
      var value = event.target.value
      var maxlength = this.maxlength
      if (maxlength && value.length >= maxlength) {
        return event.preventDefault()
      }
      let { format, options } = this.formatObject
      switch (format) {
        case 'number': return masks.only.number_keys(event, options)
        case 'decimal': return masks.only.decimal_keys(event, options)
        case 'password': return masks.only.password_keys(event, options)
      }
      if (format.indexOf('date') >= 0) {
        return masks.only.date_keys(event)
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
    /*
         * Set the raw value into formatted value
         */
    setValue (value, key) {
      if (this.isEmpty(value)) {
        this.newValue = ''
        return
      }

      if (this.toHalfWidth) {
        value = formatter.toHalfWidth(value)
      }

      if (this.isLowercase) {
        value = value.toLowerCase()
      }
      if (this.isUppercase) {
        value = value.toUpperCase()
      }

      if (this.maxlength) {
        var maxlength = Number(this.maxlength)
        value = value.substring(0, maxlength)
      }

      var { format, options } = this.formatObject
      if (format === 'text') {
        this.newValue = value
        return
      } else if (!(key === '.' && format === 'decimal')) {
        value = formatter.format(value, format, options)
      }
      if (typeof this.beforeUpdate === 'function') {
        this.newValue = this.beforeUpdate(value)
      } else {
        this.newValue = value
      }
      this.$forceUpdate()
    },
    /*
         * Get the unformatted value
         */
    getRaw (value) {
      var { format, options } = this.formatObject
      if (format === 'text' || this.type !== 'text') {
        return value
      }
      value = formatter.getValue(value, format, options)
      return value
    },
    clear () {
      this.preventUpdate = true
      this.newValue = ''
      this.$nextTick(() => {
        this.preventUpdate = false
      })
    },
    reset () {
      // Blur the input if it's focused to prevent required errors
      // when it's value is reset
      if (document.activeElement === this.$el) {
        document.activeElement.blur()
      }
      this.setValue(this.initialValue)
    }
  },
  watch: {
    /**
         * When v-model is changed:
         *   1. Set internal value.
         *   2. If it's invalid, validate again.
         */
    value (value) {
      var val = this.isEmpty(value) ? value : this.getRaw(value)
      if (this.getRaw(this.newValue) !== val) {
        this.setValue(val)
      }
    },
    /*
         * When newValue is updated emit newValue to v-model
         *
         */
    newValue (value) {
      var val = this.isEmpty(value) ? value : this.getRaw(value)
      if (val !== this.getRaw(this.value) && !this.preventUpdate) {
        this.$emit('update', val)
      }
    }
  },
  created () {
    var value = this.value
    if (this.isEmpty(value)) {
      this.initialValue = ''
    }
    this.setValue(value)
  },
  mounted () {
    // if(this.format != 'text'){
    // this.$el.onchange = this.updateValue;
    // }else{
    this.$el.addEventListener('input', this.updateValue)
    // }
    if (this.preventKeys && this.format != 'text') {
      this.$el.addEventListener('keydown', this.onKeydown)
    }
    if (this.replaceOnInput) {
      this.$el.addEventListener('focus', this.$el.select)
    }
  }
}
</script>
