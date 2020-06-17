<template>
    <thead class="header-row">
        <tr>
            <component v-for="(column,index) in columns" :key="index"
                       ref="index"
                       @sort="sort"
                       v-on="cell.events"
                       v-bind="cell.props"
                       v-show="column.show != false"
                       v-if="column.if != false"
                       :column="column"
                       :is="getCell()"
                       :bus="bus"
                       ></component>
        </tr>
    </thead>
</template>

<script>
import HeaderCell from './Cell'
export default {
    name:'header-row',
    data() {
        return {
            eventPrefix:'uitable:'
        }
    },
    props: {
        bus:{
            required:false,
        },
        cell:{
            type:Object,
            default:()=>{return {}},
        },
        multiple_sort:{
            type:Boolean,
            default:false,
        },
        columns: {
            type: Array,
            required: true
        },
    },
    methods:{
        sort(column){
            if(!this.multiple_sort){
                var columns = this.columns;
                for(let c in columns){
                    var col = columns[c];
                    if(col.name != column.name && col.order){
                        delete col.order;
                    }
                }
                for(let i = 0; i < columns.length; i++){
                    this.$refs['index'][i].reset();
                }
            }
        },
        getCell(){
            var cell = this.cell;
            if(cell && cell.component){
                return cell.component
            }
            return 'header-cell';
        },
    },
    components:{
        'header-cell':HeaderCell
    }
}
</script>
<style lang="scss">
.header-row{
    width:100%;
}
</style>
