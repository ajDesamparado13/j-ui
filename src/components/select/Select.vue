<template>
    <ui-field class="ui-select " v-bind="field_props">
        <input class="ui-select__hidden-input" type="hidden" :name="name" :value="newValue" v-if="name" >
        <ui-control :isFullwidth="isFullwidth" :icon="$attrs['icon']" :iconLeft="$attrs['iconLeft']"
            :iconRight="$attrs['iconRight']" :iconPosition="$attrs['iconPosition']">
            <div class="select">
                <select
                    :class="selectClass"
                    :readonly="readonly"
                    :disabled="disabled"
                    ref="select"
                    :multiple="multiple"
                    v-bind="$attrs"
                    :value="newValue"
                    @input="updateValue">
                    <option ref="placeholder" class="is-placeholder" value="" selected hidden>{{ placeholder }}</option>
                    <option ref="blank"  class="is-placeholder" v-if="blankLabel" :value="blankLabel">{{ blankLabel }}</option>
                    <option v-if="isObject" v-for="(opt,index) in options" :value="opt[keys.value]">{{opt[keys.label]}}</option>
                    <option v-else v-for="(opt,index) in options" :value="opt">{{opt}}</option>
                </select>
            </div>
        </ui-control>
    </ui-field>
</template>

<script>
import BaseUI from '../BaseUI'
import BaseForm from '../BaseForm'
import option from './SelectOption'
import Control from '../control'
export default {
    extends:BaseUI,
    name:'ui-select',
    data(){
        return {
            newValue:'',
        }
    },
    watch:{
        value(value){
            var val = this.getValue(value)
            if(this.newValue != val){
                this.newValue = val;
            }
        },
    },
    props: {
        blankLabel:{
            type:String,
            default:'未選択',
        },
        keys:{
            type:Object,
            default:()=>{return { label:'label', value:'value',}}
        },
        name: String,
        value: {
            required: true
        },
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        placeholder: String,
        icon: String,
        iconPosition: {
            type: String,
            default: 'left' // 'left' or 'right'
        },
        type: {
            type: String,
            default: 'basic' // 'basic' or 'image'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        multipleDelimiter: {
            type: String,
            default: ', '
        },
        hasSearch: {
            type: Boolean,
            default: false
        },
        searchPlaceholder: {
            type: String,
            default: 'Search'
        },
        filter: Function,
        disableFilter: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        noResults: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        objectify:{
            type:Boolean,
            default:false,
        },
        isFullwidth:{
            type:Boolean,
            default:false,
        },
        defaultValue:{ type:[String,Number],default:''}
    },
    computed:{
        selectClass(){
            return [
                //{ 'is-multiple': this.multiple },
                { 'is-placeholder': (typeof this.value != 'number') && !Boolean(this.value) },
                { 'is-fullwidth': this.isFullwidth}
            ]
        },
        displayOptions(){
        },
        isObject(){
            return typeof this.options[0] == 'object'
        },
    },
    methods:{
        updateValue(event){
            var keys = this.keys;
            var val = event.target.value;
            var value = '';
            /*
            * if blank is selected
            * change value to placeholder's value
            */
            if(val == this.blankLabel){
                val = '';
            }else{
                value = this.objectify ? this.getObject(val) : this.getValue(val);
            }

            this.newValue = val;

            this.$emit('input',value);
            this.$emit('change',value);
        },
        getValue(value){
            if(value == undefined || value == ''){
                return value;
            };
            var keys = this.keys;
            var isObject = typeof value == 'object'
            value = isObject?value[keys.value]:value;
            if(isObject){
                return value;
            }
            //check if value is not prefixed by 0
            if(value[0] != "0" || value == 0 ){
                var number = Number(value)
                value = !isNaN(number) && value[0]?number:value;
            }

            return value;
        },
        getObject(value){
            var keys = this.keys;
            var isObject = typeof value == 'object'
            value = isObject?value[keys.value]:value;

            return this.options.find((item)=>{return item[keys.value].toString() == value.toString()});
        }
    },
    components:{
        "ui-control": Control,
        'ui-select-option':option
    },
    created(){
        this.newValue = this.getValue(this.value);
    },
    mixins:[BaseForm],
}
</script>

