<template>
    <div class="calendar-week">
        <div class="calendar-week__header">
            <span v-for="day in lang.days.initials">{{ day }}</span>
        </div>

        <div
            class="calendar-week__week is-current"
            ref="current"

            :class="weekClasses"

            @transitionend="onTransitionEnd"
        >
            <calendar-day
                :filter="filter"
                :key="index"
                :max-date="maxDate"
                :min-date="minDate"
                :month="currentWeekStartDates[1].getMonth()"
                :selected="value"
                :week-start="date"

                @date-select="onDateSelect"

                v-for="(date, index) in currentWeekStartDates"
            ></calendar-day>
        </div>
    </div>
</template>

<script>
import CalendarDay from './CalendarDay.vue'

import dateUtils from './helpers'

export default {
  name: 'calendar-week',
  model: { prop: 'value', event: 'update' },
  props: {
    filter: Function,
    selected: Date,
    minDate: { type: Date, default: () => { return new Date(1990, 1, 1) } },
    maxDate: { type: Date, default: () => { return new Date() } },
    lang: { type: Object, required: true },
    value: {
      type: Date,
      required: true
    }
  },

  data () {
    return {
      dateOutOfView: dateUtils.clone(this.value),
      isSliding: false,
      slideDirection: '',

      // Detects IE and not Edge: http://stackoverflow.com/a/22082397
      isIE: Boolean(window.MSInputMethodContext) && Boolean(document.documentMode),
      ieTimeout: null
    }
  },

  computed: {
    weekClasses () {
      return [
        { [`calendar-week--slide-${this.slideDirection}`]: this.isSliding },
        { 'is-sliding': this.isSliding }
      ]
    },

    currentWeekStartDates () {
      return this.getWeekStartDates(this.value)
    }

    // otherWeekStartDates() {
    //    return this.getWeekStartDates(this.dateOutOfView);
    // }
  },

  methods: {
    getWeekStartDates (dateInWeek) {
      let date = dateUtils.clone(dateInWeek)

      date.setDate(1) // Jump to the start of the month
      date = dateUtils.moveToDayOfWeek(date, 0) // Jump to the start of the week

      const current = dateUtils.clone(date)
      current.setDate(current.getDate() + 7)

      const starts = [date]
      const month = current.getMonth()

      while (current.getMonth() === month) {
        starts.push(dateUtils.clone(current))
        current.setDate(current.getDate() + 7)
      }

      return starts
    },

    goToDate (date, options = { isForward: true }) {
      this.isSliding = true
      this.slideDirection = options.isForward ? 'left' : 'right'
      this.dateOutOfView = dateUtils.clone(date)

      // A hack for IE: sometimes when rapidly scrolling through months, the
      // transitionend event is not fired, causing the month to not change.
      // This ensures that onTransitionEnd() is called after 300ms.
      if (this.isIE) {
        this.ieTimeout = setTimeout(this.onTransitionEnd, 300)
      }
    },

    onDateSelect (date) {
      this.$emit('update', date)
      this.$nextTick(() => {
        this.$emit('select', {
          event: 'select',
          data: { value: this.value }
        })
      })
    },

    onTransitionEnd () {
      if (this.ieTimeout) {
        clearTimeout(this.ieTimeout)
        this.ieTimeout = null

        // Abort if the transition has already ended
        if (!this.isSliding) {
          return
        }
      }

      this.isSliding = false
      this.slideDirection = ''

      this.$emit('change', dateUtils.clone(this.dateOutOfView))
      this.$emit('transition-end')
    },
    initialize () {

    }
  },
  components: {
    'calendar-day': CalendarDay
  }
}
</script>
