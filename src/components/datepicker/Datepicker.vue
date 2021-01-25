<template>
<ui-field class="ui-datepicker" v-bind="$attrs">
    <ui-dropdown ref="dropdown" v-bind="{disabled}">
        <template slot="trigger">
            <ui-input v-model="newValue" ref="input" v-bind="{disabled}"
            v-on:keydown-enter="$listeners['keydown-enter']"
            v-on:keydown="$listeners['keydown']"
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

export default {
  name: 'ui-datepicker',
  data () {
    return {
      initialValue: this.value,
      newValue: ''
    }
  },
  props: {
    disabled: { type: Boolean, default: false },
    format: { type: String, default: 'Y-m-d' },
    readonly: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number, Date],
      default: ''
    },
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
        var value = this.newValue.replace(/[/,_]/g, '-')
        var arr = value.split('-')
        return new Date(arr[0] || new Date().getFullYear(), arr[1] - 1 || 0, arr[2] || 1)
      }
    }
  },
  methods: {
    getDateString (value) {
      if (value instanceof Date && !isNaN(value.valueOf())) {
        var year = value.getFullYear()
        var month = value.getMonth() + 1
        var date = value.getDate()
        value = `${year}/${month >= 10 ? month : '0' + month}/${date >= 10 ? date : '0' + date}`
      }
      return value
    },
    onActiveChange (isActive) {
      if (!isActive) return
      this.$refs['calendar'].initialize()
    },
    setCalendar () {
      if (!this.newValue) {
        this.dateObj = ''
      }
      this.$refs['calendar'].setDate(this.newValue)
    },
    calendarSelect (val) {
      this.$refs['dropdown'].close()
      if (document.activeElement === this.$refs['input'].$el) {
        return
      }
      this.$refs['input'].setValue(Arr.getProperty(val, 'target.value', val))
    }
  },
  watch: {
    value (value) {
      if (value === this.newValue) return
      this.newValue = value
      this.setCalendar()
    },
    newValue (value) {
      if (this.value === value) return
      this.setCalendar()
      this.$emit('input', value)
      this.$emit('value-change', value)
    }
  },

  created () {
    // Normalize the value to an empty string if it's null
    if (this.value === null) {
      this.initialValue = ''
      // this.updateValue('');
    } else if (this.value) {
      // this.updateValue(this.value);
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
