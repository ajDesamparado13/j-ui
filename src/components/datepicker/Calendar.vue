<template>
    <div class="ui-calendar">
        <div class="calendar-controls">
            <div class="column">
                <button class="ui-button button previous-month"  @click="previous()"></button>
            </div>
            <div class="column">
                <button class="ui-button button select-month" @click="changeMode('month')">{{ month }}</button>
            </div>
            <div class="column">
                <button class="ui-button button select-year" @click="changeMode('year')">{{ year }}</button>
            </div>
            <div class="column">
                <button class="ui-button button next-month"  @click="next()"></button>
            </div>
        </div>
        <calendar-week ref="date"
        @select="select('date')"
        v-show="mode == 'date'"
        v-model="newDate"
        v-bind="{minDate,maxDate,lang}"/>

        <calendar-month ref="month"
        @select="select('month')"
        v-show="mode == 'month'"
        v-model="newDate"
        v-bind="{minDate,maxDate,lang}"/>

        <calendar-year ref="year"
        @select="select('year')"
        v-show="mode == 'year'"
        v-model="newDate"
        v-bind="{minDate,maxDate,lang}"/>
    </div>
</template>
<script>
import CALENDAR_WEEK from './CalendarWeek'
import CALENDAR_MONTH from './CalendarMonth'
import CALENDAR_YEAR from './CalendarYear'

import helpers from './helpers'
import Arr from 'freedom-js-support/src/utilities/arr'
const defaultLang = helpers.defaultLang

export default {
  name: 'ui-calendar',
  model: {
    prop: 'value',
    event: 'update'
  },
  data () {
    return {
      mode: 'date',
      newDate: new Date(),
      default_mode: 'date'
    }
  },
  computed: {
    months () {
      return Arr.getProperty(this.lang, 'months', [])
    },
    date () {
      return this.newDate.getDate()
    },
    month () {
      return helpers.getMonthFull(this.newDate, this.lang)
    },
    year () {
      return this.newDate.getFullYear()
    }
  },
  props: {
    minDate: { type: Date, default: () => { return new Date(1990, 1, 1) } },
    maxDate: { type: Date, default: () => { return new Date() } },
    lang: { type: Object, default: () => { return defaultLang } },
    value: { type: [Date, String, Object], default: () => { return this.updateValue } }
  },
  methods: {
    select (ref) {
      if (this.default_mode === ref) return this.updateValue()
      this.changeMode(this.default_mode)
    },
    changeMode (mode) {
      if (mode === this.mode) mode = this.default_mode
      this.$refs[mode].initialize()
      this.$nextTick(() => { this.mode = mode })
    },
    clear () {
      this.newDate = new Date()
      this.mode = this.default_mode
    },
    setDate (value) {
      if (!value) return this.clear()
      var date = new Date(this.$_date.getDate(value))
      if (date instanceof Date && !isNaN(date.valueOf())) {
        this.newDate = date
      }
    },
    updateValue () {
      this.$emit('update', this.newDate)
    },
    next () {
      this.$refs[this.mode === 'year' ? 'year' : 'month'].next()
    },
    previous () {
      this.$refs[this.mode === 'year' ? 'year' : 'month'].previous()
    },
    initialize () {
      this.newDate = new Date(this.value)
      this.mode = this.default_mode
    }
  },
  mounted () {
    this.initialize()
  },
  components: {
    'calendar-month': CALENDAR_MONTH,
    'calendar-year': CALENDAR_YEAR,
    'calendar-week': CALENDAR_WEEK
  }
}
</script>

<style lang="scss">
$calendar-cell-size: 36px !default;
$calendar-controls-height: 40px !default;
$calendar-month-header-height: 40px !default;
$secondary-text-color: rgba(black, 0.54) !default;

.ui-calendar {
    .calendar-controls{
        display:flex;
        flex-wrap:nowrap;
        justify-content: space-between;
        align-content:center;
        align-items:center;
        width:100%;
        padding-bottom:10px;
        .button{
            color:#495057;
            border:0px;
            background:transparent;
            padding:0px 5px;
            height:30px;
        }
        .next-month, .previous-month{
            width:25px;
            &::before{
                font-family: "FontAwesome";
                display: inline-block;
                font-size:13px;
            }
        }
        .next-month::before{
                content: "\f105";
        }
        .previous-month::before{
                content: "\f104";
        }
    }

  .options {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li.option {
      width: 33%;
      padding: 10px 0px;
    }
    .option {
      text-align: center;
      &:hover,
      body[modality="keyboard"] &:focus {
        background-color: rgba(black, 0.1);
      }
      &.is-current,
      &.is-today {
        font-weight: bold;
      }
      &.is-selected {
        font-weight: bold;
        background-color: rgba(black, 0.1);
      }

      &.is-disabled {
        background-color: transparent;
        cursor: default;
        opacity: 0.4;
      }
    }
  }

  .calendar-week-date {
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    height: $calendar-cell-size;
    justify-content: center;
    outline: none;
    text-align: center;
    width: $calendar-cell-size;
    &.is-in-other-month {
      visibility: hidden;
    }
  }
}

    // ================================================
    // CALENDAR MONTHS
    // ================================================
    .calendar-week,
    .calendar-month,
    .calendar-year {
    overflow: hidden;
    position: relative;
    width: 100%;
    }
    .calendar-month {
    height: ($calendar-cell-size * 3.5) + $calendar-month-header-height;
    max-height: ($calendar-cell-size * 3.5) + $calendar-month-header-height;
    }
    .calendar-week,
    .calendar-year {
    height: ($calendar-cell-size * 6) + $calendar-month-header-height;
    max-height: ($calendar-cell-size * 6) + $calendar-month-header-height;
    }

    .calendar-week__header {
    align-items: center;
    display: flex;
    height: $calendar-month-header-height;
    justify-content: space-around;
    max-width: rem-calc(252px);
    width: 100%;

  span {
    align-items: center;
    color: $secondary-text-color;
    display: flex;
    font-size: rem-calc(14px);
    height: $calendar-cell-size;
    justify-content: center;
    text-transform: uppercase;
    width: $calendar-cell-size;
  }
}

    .calendar-week__week {
    $week-width: $calendar-cell-size * 7;
    position: absolute;
    width: $week-width;

    &.is-current {
        left: 0;
    }

    &.is-other {
        left: $week-width;

        &.calendar-week--slide-right {
        left: -$week-width;
        }
    }

    &.is-sliding {
        transition: transform 250ms ease;

        &.calendar-week--slide-left {
        transform: translate3d(-$week-width, 0, 0);
        }

        &.calendar-week--slide-right {
        transform: translate3d($week-width, 0, 0);
        }
    }
    }

    .calendar-week-dates {
        display: flex;
        font-size: rem-calc(14px);
        width: 100%;
    }

</style>
