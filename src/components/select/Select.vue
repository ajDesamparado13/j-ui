<template>
<ui-field class="ui-select" v-bind="$_Arr.only($attrs,['label','required','loading','invalid','name','disabled','error','help'])" >
    <input class="ui-select__hidden-input" type="hidden" v-bind="$_Arr.only($attrs,'name')" :value="newValue" v-if="$attrs['name']" >
    <div class="control">
        <select :class="{ 'is-placeholder': $_formatter.isEmpty(value) }" ref="select" v-bind="$attrs" :value="newValue" @input="updateValue">
            <option ref="placeholder" class="is-placeholder" value="" selected hidden>{{ placeholder }}</option>
            <option ref="blank"  class="is-placeholder" v-if="blankLabel" :value="blankLabel">{{ blankLabel }}</option>
            <option :key="index" v-for="(opt,index) in options" :value="$_Arr.getProperty(opt,keyValue,opt)">{{ opt | getProperty(keyLabel,opt)}} </option>
        </select>
    </div>
</ui-field>
</template>
<script>
import { Field } from '../field'
export default {
    name:'ui-select',
    model:{ prop:'value', event:'update'},
    data(){
        return {
            newValue:'',
        }
    },
    watch:{
        value:{
            immediate:true,
            handler(value){
                var val = this.getValue(value)
                this.newValue = this.newValue != val ? val : this.newValue;
            },
        },
    },
    props:{
        value:{
            required:true,
        },
        options:{
            type:Array,
            required:true,
        },
        placeholder:String,
        blankLabel:{
            type:String,
            default:'',
        },
        keyLabel:{
            type:String,
            default:'label',
        },
        keyValue:{
            type:String,
            default:'value',
        },
        defaultValue:{ type:[String,Number],default:''},
        returnObject:{
            type:Boolean,
            default:false,
        },
    },
    methods:{
        updateValue(event){
            var val = event.target.value;
            this.newValue = val === this.blankLabel ? '' : val;
            let value = '';
            if(val !== this.blankLabel ){
                value = this.returnObject ? this.getObject(this.val) : this.getValue(val)
            }
            this.$emit('update',value);
            this.$emit('change',value);
        },
        getValue(value){
            if(value == undefined || value == '') return value;
            return this.$_Arr.getProperty(value,this.keyValue,value);
        },
        getObject(value){
            let val = this.getValue(value);
            return this.options.find((item)=>{
                return (this.$_Arr.getProperty(item,this.keyValue,item)) === val
            });
        }
    },
    components:{
        'ui-field' : Field,
    }
}
</script>
<style lang="scss">
.ui-select{
    select{
        -webkit-appearance: none; 
        &:hover{
            border-color:#dbdbdb;
        }
        width:100%;
        padding-right: 2.5em;
        option {
            color: #4a4a4a;
            padding: 0.25em 0.5em;
            &:disabled{
                cursor: not-allowed;
                opacity: 0.5;
            }
        }
    }
    .control::after {
        border: 3px solid transparent;
        border-radius: 2px;
        border-right: 0;
        border-top: 0;
        content: " ";
        display: block;
        height: 0.625em;
        margin-top: -0.4375em;
        pointer-events: none;
        position: absolute;
        top: 50%;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        -webkit-transform-origin: center;
        transform-origin: center;
        width: 0.625em;
    }
}
</style>
