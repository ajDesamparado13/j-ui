<template>
<ui-field class="ui-datepicker" v-bind="$attrs">
    <ui-dropdown ref="dropdown" v-bind="$_Arr.only($attrs,['disabled'])">
        <template slot="trigger">
            <ui-input v-model="newValue" ref="input" v-bind="$_Arr.only($attrs,['disabled'])"
            v-on="$listeners"
            :format="`date|fromString:${format}`"
            />
            <button class="ui-button button trigger-button">
                <i class="fa fa-calendar" aria-hidden="true"></i>
            </button>
        </template>
        <ui-calendar ref="calendar" v-bind="{minDate,maxDate}" v-model="dateInView" /> </ui-dropdown>
</ui-field>
</template>
<script>

import Calendar from './Calendar'
import { Field } from '../field'
import { Dropdown } from '../dropdown'
import Arr from 'freedom-js-support/src/utilities/arr'
import dateUtil from 'freedom-js-support/src/utilities/date'

export default {
  name: 'ui-datepicker',
  model: { prop: 'value', event: 'update' },
  data () {
    return {
      newValue: this.value
    }
  },
  props: {
    format: { type: String, default: 'Y-m-d' },
    value: { type: [String, Number, Date], default: '' },
    minDate: { type: Date, default: () => { return new Date(1990, 1, 1) } },
    maxDate: { type: Date, default: () => { return new Date() } }
  },
  computed: {
    dateInView: {
      set (value) {
        this.newValue = this.getDateString(value)
        this.$refs['dropdown'].close()
      },
      get () {
        var arr = this.newValue.replace(/[/,_]/g, '-').split('-')
        return new Date(arr[0] || new Date().getFullYear(), arr[1] - 1 || 0, arr[2] || 1)
      }
    }
  },
  methods: {
    getDateString (value) {
      return dateUtil.format(value, { format: this.format })
    },
    setCalendarDate () {
      this.$nextTick(() => {
        if (dateUtil.isValid(this.newValue, { format: this.format })) this.$refs['calendar'].setDate(this.newValue)
      })
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        if (this.getDateString(this.newValue) !== this.getDateString(value)) {
          this.newValue = this.getDateString(value)
          this.setCalendarDate()
        }
      }
    },
    newValue (newValue) {
      this.setCalendarDate()
      if (this.value !== newValue) {
        this.$emit('update', this.newValue)
      }
    }
  },
  components: {
    'ui-calendar': Calendar,
    'ui-field': Field,
    'ui-dropdown': Dropdown
  }
}
</script>
<style lang="scss">
.ui-datepicker{
    .dropdown-content{
        max-width:310px;
        min-width:300px;
    }
    .dropdown-trigger{
        display:flex;
        border: 1px solid gray;
        input, button{
            border: 0px !important;
            border-radius: 0px !important;
        }
    }
}
</style>
