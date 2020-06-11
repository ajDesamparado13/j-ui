<template>
    <div @focus.capture="onFocus" @blur.capture="onBlur" class="ui-field field" :class="classes">
        <template v-if="isHorizontal">
            <div class="field-label">
                <label class="label" v-html="label"/>
            </div>
            <div class="field-body">
                <div class="field">
                    <slot></slot>
                </div>
            </div>
        </template>
        <template v-else>
            <label v-if="label && labelPosition=='top'" class="label" :labelFor="name">
                <span class="label-text">
                    {{label}}
                </span>
                <span v-if="required && requiredText" class="label-required">
                    {{requiredText}}
                </span>
                <span v-if="hasExtra" class="label-extra">
                    <slot name="extra">
                    </slot>
                    <template v-if="extraText">
                        {{extraText}}
                    </template>
                </span>
            </label>
            <div class="form-content">
                <label v-if="label && labelPosition!='top'" class="label" :labelFor="name">{{label}}</label>
                <slot></slot>
            </div>
            <slot name="after"></slot>
            <div class="feedback" v-if="hasMessage || message">
                <p class="help" :class="status" > {{message}} </p>
                <slot name="help"></slot>
            </div>
        </template>
    </div>
</template>

<script>
export default {
  name: 'ui-field',
  data () {
    return {
      isFocused: false,
      isTouched: false
    }
  },
  props: {
    forCheckbox: { type: Boolean, default: false },
    isHorizontal: { type: Boolean, default: false },
    message: { type: String, default: '' },
    hasMessage: { type: Boolean, default: false },
    requiredText: { type: String, default: 'required' },
    required: { type: Boolean, default: false },
    label: { type: String, default: '' },
    extraText: { type: String, default: '' },
    labelPosition: { type: String, default: 'top' },
    name: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  computed: {
    status () {
      return this.invalid ? 'is-danger' : 'is-primary'
    },
    isDisabled () {
      return this.disabled || this.loading
    },
    classes () {
      var classes = {
        'for-checkbox': this.forCheckbox,
        'is-active': this.isActive,
        'is-horizontal': this.isHorizontal,
        'is-touched': this.isTouched,
        'is-invalid': this.invalid,
        'is-disabled': this.isDisabled
      }
      classes[`label-${this.labelPosition}`] = true
      return classes
    },
    isActive () {
      return this.isFocused && !this.invalid
    },
    hasExtra () {
      return this.$slots['extra'] || this.extraText
    }
  },
  methods: {
    clear () {
      this.$children.forEach((child) => {
        if (typeof child.clear === 'function') {
          child.clear()
        }
      })
    },
    onFocus (event) {
      if (this.forCheckbox) {
        return
      }
      this.isFocused = true
      this.$emit('field-focus', event)
    },
    onBlur (event) {
      if (this.forCheckbox) {
        return
      }
      this.isFocused = false
      if (!this.isTouched) {
        this.isTouched = true
        this.$emit('field-touched')
        // this.$parent.$emit('touch');
      }
      this.$emit('field-blur', event)
    }
  }
}
</script>
