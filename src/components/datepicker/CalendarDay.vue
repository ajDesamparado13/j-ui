<template>
    <div class="calendar-week-dates options">
        <div
            v-for="(date, index) in dates"
            class="calendar-week-date option"

            :class="getDateClasses(date)"
            :key="index"
            :tabindex="(visible && !isDateDisabled(date)) ? 0 : null"

            @click="selectDate(date)"
            @keydown.enter="selectDate(date)"

        >
            {{ getDayOfMonth(date) }}
        </div>
    </div>
</template>

<script>
import dateUtils from './helpers'

export default {
  name: 'calendar-day',

  props: {
    month: Number,
    weekStart: Date,
    minDate: Date,
    maxDate: Date,
    selected: Date,
    filter: Function,
    visible: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      today: new Date()
    }
  },

  computed: {
    dates () {
      return this.buildDays(this.weekStart)
    }
  },

  methods: {
    buildDays (weekStart) {
      const days = [dateUtils.clone(weekStart)]
      let day = dateUtils.clone(weekStart)

      for (let i = 1; i <= 6; i++) {
        day = dateUtils.clone(day)
        day.setDate(day.getDate() + 1)

        days.push(day)
      }

      return days
    },

    getDateClasses (date) {
      return [
        { 'is-today': dateUtils.isSameDay(date, this.today) },
        { 'is-in-other-month': this.isDateInOtherMonth(date) },
        { 'is-selected': this.selected && dateUtils.isSameDay(date, this.selected) },
        { 'is-disabled': this.isDateDisabled(date) }
      ]
    },

    selectDate (date) {
      if (this.isDateDisabled(date)) {
        return
      }

      this.$emit('date-select', date)
    },

    getDayOfMonth (date) {
      return dateUtils.getDayOfMonth(date)
    },

    isDateInOtherMonth (date) {
      return this.month !== date.getMonth()
    },

    isDateDisabled (date) {
      const isDisabled = (this.minDate && dateUtils.isBefore(date, this.minDate)) ||
                (this.max && dateUtils.isAfter(date, this.max))

      if (isDisabled) {
        return true
      }

      return this.filter ? !this.filter(date) : false
    }
  }
}
</script>
