<template>
  <input
      class="ui-checkbox"
      v-bind="properties"
      v-on="$listeners"
      type="checkbox"
      checked.prop="isChecked"
      :true-value="trueValue"
      :false-value="falseValue"
      v-model="newValue"
      />
</template>

<script>

export default {
  name: 'ui-checkbox',
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    isInverse: {
      type: Boolean,
      default: false
    },
    value: {
      required: false
    },
    trueValue: {
      default: true
    },
    falseValue: {
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    keyName: {
      required: false
    },
    submitArray: {
      type: Boolean,
      default: false
    },
    submitObject: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      newValue: false
    }
  },

  computed: {
    properties () {
      let exclude = ['value']
      return exclude.reduce((attrs, key, index) => {
        if (attrs[key]) {
          delete attrs[key]
        }
        return attrs
      }, Object.assign({}, this.$attrs))
    },
    valueIndex () {
      if (!Array.isArray(this.value)) {
        return -1
      }
      return this.value.findIndex((item) => {
        return this.looseEqual(item, this.trueValue)
      })
    },
    isChecked: {
      get () {
        return this.looseEqual(this.newValue, this.trueValue)
      },
      set (flag) {
        this.setValue(flag)
      }
    },
    /*
    * Check if value is of object type and not an array
    */
    isValueObject () {
      return (!Array.isArray(this.value) && typeof this.value === 'object') || this.submitObject
    },
    /*
    * Check if value is of array type
    */
    isValueArray () {
      return this.submitArray || Array.isArray(this.value)
    },
    /*
    * Check if value is of primary type
    */
    isValuePrimary () {
      return typeof this.value !== 'object'
    }
  },
  watch: {
    newValue (value) {
      this.update()
    }
  },
  created () {
    /*
    * if checkbox is checked by default
    * or if checkbox is on inverse mode
    * then set newValue to true by default
    */
    // if(this.checked || ( this.isInverse && this.valueIndex < 0)){
    //    this.newValue = this.trueValue;
    // }
    /*
    * if value type is not array then update  new value
    * depending on loose equal result of value and true value
    */
    if (this.isValuePrimary) {
      this.newValue = this.looseEqual(this.value, this.trueValue)
    }
  },
  mounted () {
    if (this.isValuePrimary) {
      var deep = typeof this.value === 'object'
      this.$watch('value', this.update, { deep })
    }
  },
  methods: {
    /*
        * clear the checked prop of checkbox!
        */
    clear () {
      this.setValue(false)
    },
    /*
        * Toggle the checkbox value between true and false values
        */
    toggleValue () {
      this.newValue = this.setValue(!this.isChecked)
    },
    /*
         * Set the value-prop of checkbox base on passed argument
         * true boolean set value to trueValue
         * false boolean set value to falseValue
         */
    setValue (flag) {
      if (typeof flag !== 'boolean') {
        flag = this.looseEqual(flag, this.trueValue)
      }
      if (flag != this.isChecked) {
        this.newValue = flag ? this.trueValue : this.falseValue
      }
      return this.newValue
    },
    /*
         * Array submit type value-prop update}
         */
    arrayUpdate () {
      var list = this.value
      var index = this.valueIndex
      var checked = this.isInverse ? !this.isChecked : this.isChecked

      if (checked && index < 0) {
        this.$set(list, list.length, this.trueValue)
      }

      if (!checked && index >= 0) {
        this.$delete(list, this.valueIndex)
      }
      this.$emit('toggled')
    },
    objectUpdate () {
      var checked = this.isInverse ? !this.isChecked : this.isChecked
      if (checked) {
        this.value[this.keyName] = this.newValue
      } else {
        delete this.value[this.keyName]
      }
      this.$emit('toggled')
    },
    /*
    * Non Array submit value-prop update
    */
    valueUpdate () {
      if (!this.isValuePrimary || this.looseEqual(this.newValue, this.value)) {
        return
      }
      this.$emit('update', this.newValue)
      this.$emit('toggled')
    },
    update () {
      if (this.isValueArray) {
        return this.arrayUpdate()
      }
      if (this.isValueObject) {
        return this.objectUpdate()
      }
      return this.valueUpdate()
    },
    /*
    * Check if value is an object type
    */
    isObject (val) {
      return !Array.isArray(val) && typeof val === 'object'
    },
    /*
    * Loosely Check if value a and b are equal
    */
    looseEqual (a, b) {
      // eslint-disable-next-line eqeqeq
      if (this.isObject(a) && this.isObject(b)) {
        if (this.keyName) {
          var key = this.keyName
          return a[key] === b[key]
        }
        return JSON.stringify(a) === JSON.stringify(b)
      }
      return a === b
    }
  }
}
</script>
