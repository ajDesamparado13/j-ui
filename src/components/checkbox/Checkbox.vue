<template>
    <component :is="containerElement" class="ui-checkbox" :class="{ 'is-checked': isChecked }">
            <div class="checkmark">
                <input ref="input"
                    v-bind="$attrs"
                    v-on="$listeners"
                    type="checkbox"
                    checked.prop="isChecked"
                    :true-value="trueValue"
                    :false-value="falseValue"
                    v-model="newValue"
                />
                <div class="ui-checkbox__focus-ring"></div>
            </div>
            <div class="ui-checkbox__label-text" v-if="label || $slots.default">
                <slot>{{ label }}</slot>
            </div>
    </component>
</template>

<script>

export default {
  name: 'ui-checkbox',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    containerElement: {
      type: String,
      default: 'label'
    },
    isInverse: {
      type: Boolean,
      default: false
    },
    label: String,
    value: {
      default: false
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
      newValue: false,
      doEmit: true
    }
  },

  computed: {
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
      if (value === '' || typeof value === 'undefined' || value === null) {
        return
      }
      this.update()
    }
  },
  created () {
  },
  mounted () {
    if (this.isValueObject) {
      this.initializeValueObject()
    }
    if (this.isValuePrimary) {
      this.initializeValuePrimary()
    }
    if (this.isValueArray) {
      this.initializeValueArray()
    }
  },
  methods: {
    initializeValuePrimary () {
      this.setValue(this.looseEqual(this.value, this.trueValue))
    },
    initializeValueArray () {
      var list = this.value
      var index = list.findIndex((item) => {
        return this.looseEqual(item, this.trueValue)
      })
      this.setValue(index >= 0)
    },
    initializeValueObject () {
      this.setValue(this.value.hasOwnProperty(this.keyName))
    },
    allowDefault () {
      this.doEmit = true
      return this
    },
    preventDefault () {
      this.doEmit = false
      return this
    },
    clear () {
      this.setValue(false)
    },
    toggle () {
      this.newValue = this.setValue(!this.isChecked)
    },
    setValue (flag) {
      if (typeof flag !== 'boolean') {
        flag = this.looseEqual(flag, this.trueValue)
      }
      this.newValue = flag ? this.trueValue : this.falseValue
      return this.newValue
    },
    arrayUpdate () {
      var list = this.value
      var index = list.findIndex((item) => {
        return this.looseEqual(item, this.trueValue)
      })

      var checked = this.isInverse ? !this.isChecked : this.isChecked

      if (checked && index < 0) {
        this.$set(list, list.length, this.trueValue)
      }

      if (!checked && index >= 0) {
        this.$delete(list, index)
      }
    },
    objectUpdate () {
      var checked = this.isInverse ? !this.isChecked : this.isChecked
      if (checked) {
        this.value[this.keyName] = this.newValue
      } else {
        delete this.value[this.keyName]
      }
    },
    /*
         * Non Array submit value-prop update
         */
    valueUpdate () {
      if (!this.isValuePrimary || this.looseEqual(this.newValue, this.value)) {
        return
      }
      this.$emit('update', this.newValue)
    },
    update () {
      if (this.isValueObject) {
        this.objectUpdate()
      } else if (this.isValueArray) {
        this.arrayUpdate()
      } else {
        this.valueUpdate()
      }
      this.emitToggle()
    },
    emitToggle () {
      if (!this.doEmit) {
        this.$emit(this.isChecked ? 'checked' : 'unchecked', this.newValue)
        this.$emit('toggled', {
          isChecked: this.isChecked,
          isInverse: this.isInverse,
          trueValue: this.trueValue,
          falseValue: this.falseValue
        })
      }
      this.doEmit = true
    },
    isObject (val) {
      return !Array.isArray(val) && typeof val === 'object'
    },
    looseEqual (a, b) {
      if (this.isObject(a) && this.isObject(b)) {
        if (this.keyName) return a[this.keyName] === b[this.keyName]
        return JSON.stringify(a) === JSON.stringify(b)
      }
      return a === b
    }
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables';
@import '../../scss/util';

$ui-checkbox-size                   : 20px ; // no !default as it shouldn't be overridden
$ui-checkbox-focus-ring-size        : $ui-checkbox-size * 2.1;
$brand-primary-color                : #006a4d;

label.ui-checkbox{
    display: flex;
}

.ui-checkbox {
    align-items: center;
    font-weight: normal;
    margin: 0;
    position: relative;
    line-height: normal;;

    &.is-checked {
        .checkmark::before {
            background-color: $brand-primary-color;
            border-color: $brand-primary-color;
        }
        .checkmark::after {
            border-bottom: 2px solid white;
            border-right: 2px solid white;
            opacity: 1;
        }
    }

    .checkmark {
        background-color: white;
        cursor: pointer;
        height: $ui-checkbox-size;
        position: relative;
        width: $ui-checkbox-size;

        &::before {
            border-radius: 2px;
            border: 1px solid $brand-primary-color;
            box-sizing: border-box;
            content: "";
            display: block;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            transition: all 0.3s ease;
            width: 100%;
            z-index:1;
        }

        &::after {
            bottom: rem-calc(5px);
            box-sizing: border-box;
            content: "";
            display: block;
            height: rem-calc(13px);
            left: rem-calc(7px);
            opacity: 0;
            position: absolute;
            transform: rotate(45deg);
            transition-delay: 0.1s;
            transition: opacity 0.3s ease;
            width: rem-calc(6px);
            z-index:1;
        }
    }

    .ui-checkbox__label-text {
        cursor: pointer;
        font-size: 16px;
        margin-left: rem-calc(8px);
    }
    input {
        cursor:pointer;
        position: absolute;
        left:0px;
        top:0px;
        width:100%;
        height:100%;
        opacity: 0;
        z-index:2;

        body[modality="keyboard"] &:focus + .checkmark {
            .ui-checkbox__focus-ring {
                opacity: 1;
                transform: scale(1);
            }
        }
    }

    .ui-checkbox__focus-ring {
        border-radius: 50%;
        height: $ui-checkbox-focus-ring-size;
        margin-left: -($ui-checkbox-focus-ring-size - $ui-checkbox-size) / 2;
        margin-top: -($ui-checkbox-focus-ring-size - $ui-checkbox-size) / 2;
        opacity: 0;
        position: absolute;
        transform: scale(0);
        transition-duration: 0.15s;
        transition-property: opacity, transform;
        transition-timing-function: ease-out;
        width: $ui-checkbox-focus-ring-size;
        background-color: rgba($brand-primary-color, 0.18);
    }

}
</style>
