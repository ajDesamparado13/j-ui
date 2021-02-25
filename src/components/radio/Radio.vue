<template>
    <label class="ui-radio radio" ref="label" :class="{ 'has-custom-checkmark':hasCustomCheckMark, 'is-disabled': this.$_Arr.getProperty($attrs,'disabled',false) ,'is-checked' : isChecked}" @click="onLabelClick" @keydown.prevent.enter="onKeyEnter">
        <input hidden type="radio" @input="onInput" v-on="$listeners" v-bind="$attrs" ref="input" :value="value">
        <div class="checkmark" v-html="checkmark"></div>
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
import defaults from './defaults'
export default {
  name: 'ui-radio',
  inheritAttrs: false,
  model: {
    prop: 'input',
    event: 'update'
  },
  props: {
    input: [String, Number, Boolean, Function, Object, Array],
    value: { required: true },
    activeCheckmark: { type: String, default: defaults.activeCheckmark },
    inactiveCheckmark: { type: String, default: defaults.inactiveCheckmark }
  },
  data () {
    return {
      newValue: this.input
    }
  },
  computed: {
    hasCustomCheckMark () {
      return Boolean(this.checkmark)
    },
    checkmark () {
      if (!(this.activeCheckmark && this.inactiveCheckmark)) return ''
      return this.isChecked ? this.activeCheckmark : this.inactiveCheckmark
    },
    isChecked () {
      return this.newValue === this.value
    }
  },
  methods: {
    onInput (event) {
      this.newValue = this.$_Arr.getProperty(event, 'target.value', this.value)
    },
    onKeyEnter () {
      this.$refs.label.click()
    },
    onLabelClick () {
      this.$refs.input.click()
    }
  },
  watch: {
    newValue (value) {
      this.$emit('update', value)
    },
    input (value) {
      if (this.newValue !== value) this.newValue = value
    }
  }
}
</script>

<style lang="scss">
.ui-radio{
  display: block;
  position: relative;
  padding-left:35px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .checkmark{
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
  &:not(.has-custom-checkmark){
    .checkmark{
        border: 1px solid gray;
        &:after{
            content: "";
            position: absolute;
            display: none;
            top: 3px;
            left: 3px;
            width: 13px;
            height: 12px;
            background: white;
            border-radius: 50%;
        }
    }
    &.is-checked{
        .checkmark{
            border-color:#2196F3;
            &:after{
                background-color: #2196F3;
                display:block;
            }
        }
    }
  }
}
</style>
