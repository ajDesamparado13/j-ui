<template>
    <div class="ui-calendar">
        <div class="header columns">
            <div class="column">
                <ui-button @click="previous()" class="month-previous " type="secondary"><ui-icon icon="chevron-left"/></ui-button> 
            </div>
            <month-picker class="column" :readonly="!showMonthPicker" v-model="month"></month-picker>
            <year-picker v-bind="{min,max}" class="column" :readonly="!showYearPicker" v-model="year"></year-picker>
            <div class="column">
                <ui-button @click="next()" class="month-next " type="secondary"><ui-icon icon="chevron-right"/></ui-button>
            </div>
        </div>
        <calendar-month v-model="date" @select="$nextTick(()=>{updateValue()})" :date-in-view="dateInView.obj" :lang="lang"></calendar-month>
    </div>
</template>
<script>
import Monthpicker from './Monthpicker'
import Yearpicker from './Yearpicker'
import CalendarMonth from './CalendarMonth'

import helpers from '../helpers'
const default_lang = helpers.date.defaultLang;

export default {
    name:'ui-calendar',
    model:{
        prop:'value',
        event:'update',
    },
    data(){
        var newDate = new Date();
        return {
            month:newDate.getMonth()+1,
            year:newDate.getFullYear(),
            date:newDate.getDate(),
            stopFlag:false,
        }
    },
    computed:{
        months(){
            return this.lang.months;
        },
        dateInView(){
            var month = this.month;
            var year = this.year;
            var date = this.date;
            var obj = new Date(year,month-1,date)

            //prefix value with '0' if value is less than 10
            month = month >= 10 ? month : '0'+month;
            date = date >= 10 ? date : '0'+date;

            return {
                month:Number( month ),
                year:Number( year ),
                date:Number( date ),
                obj,
                string:`${year}/${month}/${date}`
            }
        },
    },
    props:{
        min: { type:Date, default:()=>{return new Date(1990,1,1)} },
        max: { type:Date, default:()=>{return new Date()} },
        showMonthPicker:{ type:Boolean, default:false},
        showYearPicker:{ type:Boolean, default:true},
        lang:{ type:Object, default:()=>{return default_lang}, },
        value:{ type:[Date,String,Object], default:()=>{ return this.updateValue} },
    },
    methods:{
        clear(){
            this.stopFlag = true;
            var newDate = new Date();
            this.month=newDate.getMonth()+1;
            this.year=newDate.getFullYear();
            this.date=newDate.getDate();
            this.$nextTick(()=>{
                this.stopFlag = false;
            })
        },
        setDate(value){
            if(!value){
                return this.clear();
            }
            //value = this.$date.fromString(value);
            var date = new Date(this.$date.getDate(value));
            if(date instanceof Date && !isNaN(date.valueOf())){
                this.month = date.getMonth()+1
                this.year = date.getFullYear()
                this.date = date.getDate()
            }
        },
        updateValue(){
            this.$emit('update',this.dateInView)
        },
        /*
         * Change month value to the next month
         */
        next(){
            var month = this.month;
            if( month == 12){
                if(this.year == new Date().getFullYear()){
                    return;
                }
                this.year += 1
            }
            month = month == 12 ? 1 : month+1
            this.month = month;
        },
        /*
         * Change month value to the previous month
         */
        previous(){
            var month = this.month;
            if(month==1){
                this.year -= 1
            }
            month = month==1?12:month-1
            this.month = month;
        },
    },
    components:{
        'month-picker':Monthpicker,
        'year-picker':Yearpicker,
        'calendar-month':CalendarMonth,
    }
}
</script>
<style lang="scss">
.ui-calendar{
    .header{
        align-content:center;
        align-items:center;
        width:100%;
        .ui-button,.ui-select{
            &:not(:last-child){
                margin-right:10px;
            }
        }
        .column{
            padding:0.75em 0.25em;
        }
    }
    color:black;
    padding: 10px 20px 0px 20px;
}
</style>
