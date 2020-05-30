<template>
    <div class="calendar-month">
        <div class="calendar-month__header">
            <span v-for="day in lang.days.initials">{{ day }}</span>
        </div>

        <div
            class="calendar-month__week is-current"
            ref="current"

            :class="weekClasses"

            @transitionend="onTransitionEnd"
        >
            <calendar-week
                :date-filter="dateFilter"
                :key="index"
                :max-date="max"
                :min-date="min"
                :month="currentWeekStartDates[1].getMonth()"
                :selected="selected"
                :week-start="date"

                @date-select="onDateSelect"

                v-for="(date, index) in currentWeekStartDates"
            ></calendar-week>
        </div>

        <div v-if="false" class="calendar-month__week is-other" ref="other" :class="weekClasses">
            <calendar-week
                :key="index"
                :max-date="max"
                :min-date="min"
                :month="otherWeekStartDates[1].getMonth()"
                :selected="selected"
                :visible="false"
                :week-start="date"

                @date-select="onDateSelect"

                v-for="(date, index) in otherWeekStartDates"
            ></calendar-week>
        </div>
    </div>
</template>

<script>
import CalendarWeek from './CalendarWeek.vue';

import dateUtils from './helpers/date';

export default {
    name: 'calendar-month',
    model:{
        prop:'value',
        event:'select',
    },
    props: {
        lang: Object,
        dateFilter: Function,
        dateInView: Date,
        selected: Date,
        max: Date,
        min: Date,
        value:{type:[String,Number],default:()=>{return new Date().getDate()}}
    },

    data() {
        return {
            dateOutOfView: dateUtils.clone(this.dateInView),
            isSliding: false,
            slideDirection: '',

            // Detects IE and not Edge: http://stackoverflow.com/a/22082397
            isIE: Boolean(window.MSInputMethodContext) && Boolean(document.documentMode),
            ieTimeout: null
        };
    },

    computed: {
        weekClasses() {
            return [
                { [`calendar-month--slide-${this.slideDirection}`]: this.isSliding },
                { 'is-sliding': this.isSliding }
            ];
        },

        currentWeekStartDates() {
            return this.getWeekStartDates(this.dateInView);
        },

        otherWeekStartDates() {
            return this.getWeekStartDates(this.dateOutOfView);
        }
    },

    methods: {
        getWeekStartDates(dateInWeek) {
            let date = dateUtils.clone(dateInWeek);

            date.setDate(1); // Jump to the start of the month
            date = dateUtils.moveToDayOfWeek(date, 0); // Jump to the start of the week

            const current = dateUtils.clone(date);
            current.setDate(current.getDate() + 7);

            const starts = [date];
            const month = current.getMonth();

            while (current.getMonth() === month) {
                starts.push(dateUtils.clone(current));
                current.setDate(current.getDate() + 7);
            }

            return starts;
        },

        goToDate(date, options = { isForward: true }) {
            this.isSliding = true;
            this.slideDirection = options.isForward ? 'left' : 'right';
            this.dateOutOfView = dateUtils.clone(date);

            // A hack for IE: sometimes when rapidly scrolling through months, the
            // transitionend event is not fired, causing the month to not change.
            // This ensures that onTransitionEnd() is called after 300ms.
            if (this.isIE) {
                this.ieTimeout = setTimeout(this.onTransitionEnd, 300);
            }
        },

        onDateSelect(date) {
            this.$emit('select',date.getDate());
        },

        onTransitionEnd() {
            if (this.ieTimeout) {
                clearTimeout(this.ieTimeout);
                this.ieTimeout = null;

                // Abort if the transition has already ended
                if (!this.isSliding) {
                    return;
                }
            }

            this.isSliding = false;
            this.slideDirection = '';

            this.$emit('change', dateUtils.clone(this.dateOutOfView));
            this.$emit('transition-end');
        }
    },

    components: {
        CalendarWeek
    }
};
</script>

