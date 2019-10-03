<template>
    <div class="ui-month-picker month-picker":class="{'has-select':!readonly}">
        <div class="select is-primary" v-if="!readonly" >
            <ui-pick class="ui-month-picker"
                                      v-model="newValue"
                                      v-bind="$attrs"
                                      :options="monthOptions"
                                      >
            </ui-pick>
        </div>
        <span v-if="readonly" class="title is-6">{{month.label}}</span>
    </div>
</template>

<script>
import helpers from '../helpers'
const default_lang = helpers.date.defaultLang;

export default {
    name:'ui-month-picker',
    data(){
        return {
            newValue:1,
        }
    },
    watch:{
        value(val){
            this.newValue = val;
        },
        newValue(){
            this.$emit('input',this.newValue);
        }
    },
    props:{
        readonly:{ type:Boolean,default:false },
        value:{ type:[Number,String], required:false, },
        lang:{ type:Object, default:()=>{return default_lang}, },
    },
    computed:{
        month(){
            return this.getValue(this.newValue);
        },
        months(){
            return this.lang.months;
        },
        monthOptions(){
            var options = [];
            var months = this.months.full;
            for(let i in months){
                var monthNumber = Number(i)+1;;
                options.push({value:monthNumber,label:months[i]});
            }
            return options;
        }
    },
    methods:{
        getValue(value){
            return this.monthOptions.find((item)=>{return item.value == value});
        },
    },
    created(){
        this.newValue = this.getValue(this.value).value;
    },
}
</script>

<style lang="scss">
.ui-month-picker{
    span.title{
        white-space:nowrap;
    }
}
</style>
