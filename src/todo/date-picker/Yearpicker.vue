<template>
    <div class="ui-year-picker year-picker" :class="{'has-select':!readonly}">
        <div class="select is-primary" v-if="!readonly" >
            <ui-pick  class="ui-year-picker"
                                        v-model="year"
                                        v-bind="$attrs"
                                        :options="yearOptions"
                                        >
            </ui-pick>
        </div>
        <span v-if="readonly" class="title is-6">{{year}}</span>
    </div>
</template>

<script>
export default {
    name:'ui-year-picker',
    data(){
        return {
            year:new Date().getFullYear(),
        }
    },
    watch:{
        value(val){
            this.year = val;
        },
        year(val){
            this.$emit('input',val);
        },
    },
    props:{
        readonly:{ type:Boolean,default:false },
        value:{
            type:[Number,String],
            required:false,
        },
        max:{
            type:Date,
        },
        min:{
            type:Date,
        },
        focusedYear: Number,
        default:()=>{return new Date().getFullYear()},
    },
    computed:{
        yearOptions() {
            const latestYear = this.max ? this.max.getFullYear() : new Date().getFullYear()
            const earliestYear = this.min ? this.min.getFullYear() : 1900

            const arrayOfYears = []
            for (let i = earliestYear; i <= latestYear; i++) {
                arrayOfYears.push({value:i,label:i})
            }

            return arrayOfYears.reverse()
        },
    }
}
</script>

<style lang="scss">
.ui-year-picker{
    span.title{
        white-space:nowrap;
    }
}
</style>
