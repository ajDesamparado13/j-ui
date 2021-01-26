<template>
    <ui-field class="ui-textbox"  v-bind="$_Arr.only($attrs,['label','required','loading','invalid','name','disabled','error','help'])" >
        <ui-control v-bind="$_Arr.only($attrs,['icon','iconLeft','iconRight','iconPosition'])">
            <component ref="input" v-bind="$attrs" v-model="newValue" v-on="$listeners"
            :autocomplete="autocomplete ? autocomplete : null"
            :maxlength="enforceMaxlength ? maxlength : null"
            :number="type === 'number' ? true : null"
            :type="type"
            :is="type ==='textarea' ? 'ui-textarea' : 'ui-input'"
            />
        </ui-control>
        <slot slot="after"></slot>
        <small
            v-if="maxlength && enforceMaxlength"
            slot="help"
            class="help counter"
            :class="{ 'is-invisible': !isFocused }">
            {{ valueLength }} / {{ maxlength }}
        </small>
    </ui-field>
</template>

<script>
import BaseUI from '../BaseUI'
import { Control } from '../control'
import Area from './Area'
import Input from './Input'
import Field from '../field/Field'

export default {
  extends: BaseUI,
  name: 'ui-textbox',
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    return {
      initialValue: this.value,
      newValue: ''
    }
  },
  props: {
    prefix: { type: String, default: '' },
    divider: { type: Number, default: 1 },
    multiplier: { type: Number, default: 1 },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    type: {
      type: String,
      default: 'text' // all the possible HTML5 input types, except those that have a special UI
    },
    autocomplete: String,
    autofocus: {
      type: Boolean,
      default: false
    },
    maxlength: Number,
    enforceMaxlength: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    valueLength () {
      return this.value ? this.value.length : 0
    }
  },
  methods: {
    clear () {
      this.$refs['input'].clear()
    },
    reset () {
      this.$refs['input'].reset()
    },
    focus () {
      this.$el.querySelector(this.type === 'textarea' ? 'textarea' : 'input').focus()
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.newValue = value
      }
    },
    newValue (value) {
      this.$emit('input', value)
    }
  },
  components: {
    'ui-field': Field,
    'ui-control': Control,
    'ui-input': Input,
    'ui-textarea': Area
  }
}
</script>
