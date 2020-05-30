<template>
    <ui-field class="ui-date-picker date-picker" v-bind="field_props">
        <ui-dropdown v-bind="{disabled,readonly}" ref="dropdown" @active-change="onActive" v-if="!isMobile">
            <ui-control is-fullwidth is-expanded slot="trigger" v-bind="{icon,iconPosition}">
                <ui-input
                    ref="date-input"
                    class="is-fullwidth"
                    :format="`date|fromString:${format}`"
                    v-bind="$attrs"
                    :placeholder="placeholder"
                    :loading="loading"
                    :disabled="disabled"
                    :readonly="readonly"
                    v-model="newValue"
                    @keydown-enter="onKeydownEnter"
                    @focus="onFocus"
                    @blur="onBlur"
                    />
            </ui-control>
            <ui-dropdown-item custom hasLink>
                <ui-calendar ref="date-calendar" v-bind="{min,max}"
                                                 @update="calendarSelect(dateObj.string)" v-model="dateObj"/>
            </ui-dropdown-item>
        </ui-dropdown>
    </ui-field>
</template>

<script>
import BaseForm from '../BaseForm'
import BaseUI from '../BaseUI'
import Calendar from './Calendar'
import Input  from '../input/Input'
import Control from '../control'

export default {
    extends:BaseUI,
    name:'ui-date-picker',
    data() {
        return {
            dateObj:'',
            initialValue: this.value,
            newValue:'',
        };
    },
    props: {
        format:{type:String,default:'Y-m-d'},
        isMobile:{
            type:Boolean,
            default:false,
        },
        readonly:{
            type:Boolean,
            default:true,
        },
        value: {
            type: [String, Number,Date],
            default: ''
        },
        autocomplete: String,
        autofocus: {
            type: Boolean,
            default: false
        },
        min: { type:Date, default:()=>{return new Date(1990,1,1)} },
        max: { type:Date, default:()=>{return new Date()} },
        icon:{ type:[ String,Object ], default:'calendar' },
        iconPosition:{ type:String, default:'right' },
        objectify:{ type:Boolean,default:false},
    },
    methods:{
        onActive(){
        },
        setCalendar(){
            var value = this.newValue;
            if(!value){
                this.dateObj = '';
            }
            this.$refs['date-calendar'].setDate(value);
        },
        calendarSelect(val){
            this.$refs['dropdown'].selectItem(val);
            if(document.activeElement == this.$refs['date-input'].$el){
                return;
            }
            var value = val.target?val.target.value:val
            this.$refs['date-input'].setValue(value);
        },
        onKeydown(e) {
            this.$emit('keydown', e);
        },
        resetTouched(options = { touched: false }) {
            this.isTouched = options.touched;
        },
        onKeydownEnter(e) {
            this.$emit('keydown-enter', e);
        },
        refreshSize() {
            if (this.autosizeInitialized) {
                autosize.update(this.$refs.textarea);
            }
        },
    },
    watch:{
        /**
         * When v-model is changed:
         *   1. Set internal value.
         *   2. If it's invalid, validate again.
         */
        value(value) {
            if(value != this.newValue){
                this.newValue = value
                this.setCalendar();
            }
        },

        /**
         * Update user's v-model and validate again whenever
         * internal value is changed.
         */
        newValue(value) {
            if(this.value != value){
                this.setCalendar();
                this.$emit('input', value)
            }
        }
    },
    created() {
        // Normalize the value to an empty string if it's null
        if (this.value === null) {
            this.initialValue = '';
            //this.updateValue('');
        }else if(this.value){
            //this.updateValue(this.value);
        }
    },
    mixins:[BaseForm],
    components: {
        'ui-calendar':Calendar,
        'ui-input':Input,
        'ui-control':Control,
    },
};
</script>

<style lang="scss">
// ================================================
// CALENDAR variables
// ================================================

$calendar-cell-size              : rem-calc(36px) !default;
$calendar-controls-height        : rem-calc(40px) !default;
$calendar-month-header-height    : rem-calc(40px) !default;
$secondary-text-color   : rgba(black, 0.54) !default;

// ================================================
// CALENDAR MONTHS
// ================================================
.calendar-month {
    height: ($calendar-cell-size * 6) + $calendar-month-header-height;
    overflow: hidden;
    position: relative;
    width: 100%;
}

.calendar-month__header {
    align-items: center;
    display: flex;
    height: $calendar-month-header-height;
    justify-content: space-around;
    max-width:rem-calc(252px);
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


.calendar-month__week {
    $week-width: $calendar-cell-size * 7;
    position: absolute;
    width: $week-width;

    &.is-current {
        left: 0;
    }

    &.is-other {
        left: $week-width;

        &.calendar-month--slide-right {
            left: -$week-width;
        }
    }

    &.is-sliding {
        transition: transform 250ms ease;

        &.calendar-month--slide-left {
            transform: translate3d(-$week-width, 0, 0);
        }

        &.calendar-month--slide-right {
            transform: translate3d($week-width, 0, 0);
        }
    }
}

// ================================================
// CALENDAR WEEK
// ================================================

.calendar-week {
    display: flex;
    font-size: rem-calc(14px);
    width: 100%;
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

    &:hover,
    body[modality="keyboard"] &:focus {
        background-color: rgba(black, 0.1);
    }

    &.is-in-other-month {
        visibility: hidden;
    }

    &.is-today {
        font-weight: bold;
        // color is defined in UiCalendar

        &.is-selected {
            color: $accent;
        }
    }

    &.is-selected {
        color: $accent;
        // background color is defined in UiCalendar
    }

    &.is-disabled {
        background-color: transparent;
        cursor: default;
        opacity: 0.4;
    }
}

.ui-month-picker{
    min-width:rem-calc(90px);
    &.has-select{
        min-width:rem-calc(135px);
    }
}

.ui-year-picker{
    min-width:rem-calc(60px);
    &.has-select{
        min-width:rem-calc(95px);
    }
}

.ui-date-picker{
    .ui-dropdown .dropdown-menu{
        max-width:rem-calc(310px);
        min-width:rem-calc(300px);
    }
}
</style>
