<template>
    <label class="ui-checkbox" :class="classes">
        <input
            v-bind="properties"
            v-on="$listeners"
            class="ui-checkbox__input"
            type="checkbox"

            checked.prop="isChecked"
            :disabled="disabled"
            :true-value="trueValue"
            :false-value="falseValue"
            v-model="newValue"
            >

            <div class="ui-checkbox__checkmark">
                <div class="ui-checkbox__focus-ring"></div>
            </div>

            <div class="ui-checkbox__label-text" v-if="label || $slots.default">
                <slot>{{ label }}</slot>
            </div>
    </label>
</template>

<script>

import pickBy from 'lodash/pickBy';
export default {
    name: 'ui-checkbox',
    inheritAttrs:false,
    model:{
        prop:'value',
        event:'update',
    },
    props: {
        isInverse:{
            type:Boolean,
            default:false,
        },
        label: String,
        value: {
            required: false
        },
        trueValue: {
            default: true
        },
        falseValue: {
            default: false
        },
        checked: {
            type: Boolean,
            default: false
        },
        boxPosition: {
            type: String,
            default: 'left' // 'left' or 'right'
        },
        color: {
            type: String,
            default: 'primary' // 'primary' or 'accent'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        keyName:{
            type:String,
            required:false,
        },
        submitArray:{
            type:Boolean,
            default:false,
        },
    },

    data() {
        return {
            newValue:false,
        };
    },

    computed: {
        properties(){
            var exclude = ['value'];
            return pickBy(this.$attrs,(val,key)=>{
                return exclude.includes(key);
            });
        },
        valueIndex(){
            if(!Array.isArray(this.value)){
                return -1;
            }
            return this.value.findIndex((item)=>{
                return this.looseEqual(item,this.trueValue);
            })
        },
        isChecked:{
            get(){
                return this.looseEqual(this.newValue, this.trueValue)
            },
            set(flag){
                this.setValue(flag);
            },
        },
        isArray(){
            return this.submitArray || Array.isArray(this.value);
        },
        classes() {
            return [
                `ui-checkbox--color-${this.color}`,
                `ui-checkbox--box-position-${this.boxPosition}`,
                { 'is-checked': this.isChecked },
                { 'is-disabled': this.disabled }
            ];
        }
    },

    watch: {
        //value:{
        //    deep:true,
        //    handler:'update',
        //},
        newValue(value){
            if(value === '' || typeof value === 'undefined' || value === null){
                return;
            }
            this.update()
        },
    },
    created(){
        /*
        * if checkbox is checked by default
        * or if checkbox is on inverse mode
        * then set newValue to true by default
        */
        if(this.checked || ( this.isInverse && this.valueIndex < 0)){
            this.newValue = this.trueValue;
        }
        /*
        * if value type is not array then update  new value
        * depending on loose equal result of value and true value
        */
        if(!this.isArray){
            this.newValue = this.looseEqual(this.value,this.trueValue);
        }
    },
    mounted(){
        if(!this.isArray){
            this.$watch('value',this.update,{deep:true})

        }
    },
    methods: {
        /*
        * clear the checked prop of checkbox!
        */
        clear(){
            this.setValue(false);
        },
        /*
        * Toggle the checkbox value between true and false values
        */
        toggleValue(){
            this.newValue = this.setValue(!this.isChecked)
        },
        /*
         * Set the value-prop of checkbox base on passed argument
         * true boolean set value to trueValue
         * false boolean set value to falseValue
         */
        setValue(flag){
            if(typeof flag != 'boolean'){
                flag =  this.looseEqual(flag,this.trueValue);
            }
            this.newValue = flag ? this.trueValue : this.falseValue;
            return this.newValue;
        },
        /* 
         * Array submit type value-prop update}
         */
        arrayUpdate(){
            var index = this.valueIndex;
            var list = this.value;
            var checked = this.isInverse ? !this.isChecked : this.isChecked

            if(checked && index < 0){
                this.$set(list,list.length,this.trueValue);
            }

            if(!checked && index >= 0){
                this.$delete(list,index)
            }

        },
        /*
         * Non Array submit value-prop update
         */
        valueUpdate(){
            if(this.isArray){
                return;
            }

            if(this.looseEqual(this.newValue,this.value)){
                return;
            }
            this.$emit('update',this.newValue);
            return;
        },
        update(){
            if(this.isArray){
                return this.arrayUpdate() 
            }
            return this.valueUpdate();
        },
        /*
         * Check if value is an object type
         */
        isObject(val){
            return !Array.isArray(val) && typeof val == 'object'
        },
        /*
         * Loosely Check if value a and b are equal
         */
        looseEqual(a, b) {
            // eslint-disable-next-line eqeqeq
            if(this.isObject(a) && this.isObject(b)){
                if(this.keyName){
                    var key = this.keyName
                    return a[key] == b[key];
                }
                return JSON.stringify(a) === JSON.stringify(b)
            }
            return a == b
        },
    }
};
</script>

<style lang="scss">
@import '../../styles/imports';

$ui-checkbox-border-width           : rem-calc(1px) !default;
$ui-checkbox-checkmark-width        : rem-calc(2px) !default;
$ui-checkbox-transition-duration    : 0.15s !default;
$ui-checkbox-label-font-size        : rem-calc(16px) !default;

$ui-checkbox-size                   : rem-calc(20px); // no !default as it shouldn't be overridden
$ui-checkbox-focus-ring-size        : $ui-checkbox-size * 2.1;

$ui-default-border-radius           : 2px;
$primary                            : #eee;
$brand-primary-color                : #006a4d;
$brand-accent-color                : #69be28;

.ui-checkbox {
align-items: center;
display: flex;
font-weight: normal;
margin: 0;
position: relative;

&:not(.is-disabled):not(.is-checked):hover,
&:not(.is-disabled):not(.is-checked).is-active {
.ui-checkbox__checkmark::before {
border-color: rgba(black, 0.6);
}
}

&.is-checked {
.ui-checkbox__checkmark::after {
border-bottom: $ui-checkbox-checkmark-width solid white;
border-right: $ui-checkbox-checkmark-width solid white;
opacity: 1;
}
}

&.is-disabled {
.ui-checkbox__checkmark,
.ui-checkbox__label-text {
color: $disabled-text-color;
cursor: default;
}

.ui-checkbox__checkmark::before {
border-color: rgba(black, 0.26);
}

&.is-checked {
.ui-checkbox__checkmark::before {
background-color: rgba(black, 0.26);
border: none;
}
}
}
}

.ui-checkbox__label-text {
cursor: pointer;
font-size: $ui-checkbox-label-font-size;
margin-left: rem-calc(8px);
}

.ui-checkbox__checkmark {
background-color: white;
cursor: pointer;
flex-shrink: 0;
height: $ui-checkbox-size;
position: relative;
width: $ui-checkbox-size;


// Checkmark
&::after {
bottom: rem-calc(5px);
box-sizing: border-box;
content: "";
display: block;
height: rem-calc(13px);
left: rem-calc(7px);
opacity: 0;
position: absolute;
transform: rotate(45deg);
transition-delay: 0.1s;
transition: opacity 0.3s ease;
width: rem-calc(6px);
}
}

.ui-checkbox__input {
position: absolute;
opacity: 0;

body[modality="keyboard"] &:focus + .ui-checkbox__checkmark {
.ui-checkbox__focus-ring {
opacity: 1;
transform: scale(1);
}
}
}

.ui-checkbox__focus-ring {
border-radius: 50%;
height: $ui-checkbox-focus-ring-size;
margin-left: -($ui-checkbox-focus-ring-size - $ui-checkbox-size) / 2;
margin-top: -($ui-checkbox-focus-ring-size - $ui-checkbox-size) / 2;
opacity: 0;
position: absolute;
transform: scale(0);
transition-duration: $ui-checkbox-transition-duration;
transition-property: opacity, transform;
transition-timing-function: ease-out;
width: $ui-checkbox-focus-ring-size;
background-color: rgba(black, 0.12);
}

// ================================================
// Box Positions
// ================================================

.ui-checkbox--box-position-right {
.ui-checkbox__label-text {
margin-left: 0;
margin-right: auto;
order: -1;
}
}

// ================================================
// Colors
// ================================================

.ui-checkbox--color-primary {
&:not(.is-disabled).is-checked:hover,
&:not(.is-disabled).is-checked.is-active {
}
// Background
.ui-checkbox__checkmark::before {
border-radius: $ui-default-border-radius;
border: $ui-checkbox-border-width solid $brand-primary-color;
box-sizing: border-box;
content: "";
display: block;
height: 100%;
left: 0;
position: absolute;
top: 0;
transition: all 0.3s ease;
width: 100%;
}

&.is-checked {
.ui-checkbox__checkmark::before {
background-color: $brand-primary-color;
border-color: $brand-primary-color;
}

.ui-checkbox__focus-ring {
background-color: rgba($brand-primary-color, 0.18);
}
}
}

.ui-checkbox--color-accent {
&:not(.is-disabled).is-checked:hover,
&:not(.is-disabled).is-checked.is-active {
}

// Background
.ui-checkbox__checkmark::before {
border-radius: $ui-default-border-radius;
border: $ui-checkbox-border-width solid $brand-accent-color;
box-sizing: border-box;
content: "";
display: block;
height: 100%;
left: 0;
position: absolute;
top: 0;
transition: all 0.3s ease;
width: 100%;
}

&.is-checked {
.ui-checkbox__checkmark::before {
background-color: $brand-accent-color;
border-color: $brand-accent-color;
}

.ui-checkbox__focus-ring {
background-color: rgba($brand-accent-color, 0.18);
}
}
}

</style>
