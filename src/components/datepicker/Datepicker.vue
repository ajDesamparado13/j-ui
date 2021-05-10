<template>
<ui-field class="ui-datepicker" v-bind="FieldProps">
  <v-date-picker ref="datePicker" v-model="date" v-bind="Object.assign($attrs,{locale})" v-on="$listeners" :format="format" @dayclick="onDayClick">
      <template v-slot="{ inputValue, inputEvents }">
        <ui-input v-on="inputEvents" ref="input" v-bind="$_Arr.only($attrs,['disabled'])" v-model="newValue" :format="`date|fromString:${format}`" />
      </template>
  </v-date-picker>
</ui-field>
</template>

<script>

import dateUtil from 'freedom-js-support/src/utilities/date'
import defaults from './defaults'
import BaseField from '../BaseField'

export default {
  name: 'ui-datepicker',
  extends: BaseField,
  inheritAttrs: false,
  model: { prop: 'value', event: 'update' },
  data () {
    return {
      date: new Date(),
      newValue: this.getDateString(this.value)
    }
  },
  props: {
    locale: { type: String, default: defaults.locale },
    format: { type: String, default: defaults.format },
    value: { type: [String, Number, Date], default: '' }
  },
  methods: {
    onDayClick (day) {
      this.newValue = this.getDateString(day.date)
    },
    getDateString (value) {
      return value ? dateUtil.format(value, { format: this.format }) : ''
    },
    setCalendarDate () {
      this.date = dateUtil.isValid(this.newValue, this.format) ? new Date(this.newValue) : new Date()
      return this
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (this.getDateString(this.newValue) !== this.getDateString(value)) this.newValue = this.getDateString(value)
        if (this.newValue !== value) this.$emit('update', this.newValue)
      }
    },
    newValue (newValue) {
      this.setCalendarDate()
      if (this.value !== newValue) this.$emit('update', this.newValue)
    }
  }
}
</script>
