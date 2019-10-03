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
