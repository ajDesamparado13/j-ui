<template>
    <table class="ui-table table" :class="rootclasses">
        <component v-if="!noHeaders" :bus="bus" :is="createHeader()" v-bind="header" :columns="columns"></component>
        <tbody v-if="Array.isArray(data) && !noBody" >

            <component v-if="data.length>=1" v-for="(item,index) in items"
                                             v-model="items[index]"
                                             v-bind="row"
                                             :primaryKey="primary_key"
                                             :key="index"
                                             :bus="bus"
                                             :focusable="focusable"
                                             :index="index"
                                             :columns="columns"
                                             :is="createRow()"
                                             ></component>

            <tr v-if="data.length==0">
                <td style="text-align:center" :colspan="(columns.length)">{{noContentText}}</td>
            </tr>
        </tbody>
    </table>
</template>


<script>
import header_row from './components/Header/Row'
import data_row from './components/Row/Data'
export default {
    name:'ui-table',
    data(){
        return {
        }
    },
    props:{
        noBody:{type:Boolean,default:false},
        primaryKey:{ type:String,required:false},
        noHeaders:{ type:Boolean,default:false },
        bus:{ required:false, },
        backend_sorting:{type:Boolean,default:false},
        sort_multiple:{type:Boolean,default:false},
        focusable:{type:Boolean,default:false,},
        data:{type:Array, default:()=>{return[]},},
        columns:{type:Array,default:()=>{return[]}},
        row:{type:Object,required:false},
        header:{type:Object,required:false},
        noContentText:{type:String,default:'No result found'},
        sort:{type:Function,required:false},
        isNumbered:{
            type:Boolean,
            default:false,
        },
        startNumber:{
            type:Number,
            default:1,
        },
        numberKey:{
            type:String,
            default:'no',
        }
    },
    computed:{
        hasColumns(){
            return this.columns.length > 0
        },
        primary_key(){
            if(this.primaryKey){
                return this.primaryKey
            }
            if(this.isNumbered){
                return this.numberKey
            }
            if(this.hasColumns){
                return this.columns[0].name;
            }
            return 'id';
        },
        rootclasses(){
            return [
                {'no-content-table' : this.data.length == 0}
            ]
        },
        items(){
            var items = JSON.parse(JSON.stringify(this.data));
            var columns = this.columns;
            if(this.isNumbered){
                var numbering = this.startNumber;
                for(let i in items){
                    items[i][this.numberKey] =  numbering;
                    numbering++;
                }
            }

            var derivables = columns.filter((item)=>{return Boolean(item.namespace)});
            for(let i in derivables ){
                var column = derivables[i]
                var name = column.namespace.replace('.','_') + '_' + column.name;
                column['derived_key'] = name;
                for(let i in items){
                    var item = items[i];
                    items[i][name] = this.getValue(item,column);
                }
            }


            if(!this.backend_sorting){
                if(typeof this.sort == 'function'){
                    return this.sort(items,columns);
                }

                items = this.getSort(items,columns);
            }


            return items;
        }
    },
    methods:{
        getSort(items,columns){
            var sortables = columns
                .filter((col)=>{return typeof col.sortable == 'boolean' && col.order})
            for(let i in sortables){
                var col = sortables[i];
            }

            return items.sort((a,b)=>{
                var results = [];
                for(let i in sortables){
                    var sort = sortables[i];
                    var format = !sort.format?'text':sort.format;
                    var key = sort.derived_key?sort.derived_key:sort.name;
                    var order = sort.order?sort.order:'desc';
                    var flag = false;

                    if(order == 'asc'){
                        flag = this.compare(a,b,format,key);
                    }

                    if(order == 'desc'){
                        flag = this.compare(b,a,format,key);
                    }

                    if(!this.sort_multiple){
                        return flag;
                    }

                    results.push({key,order,flag,item_a:a,item_b:b});
                }
                for(let i in results){
                    var result = results[i]
                    if(result.order == 'asc' && flag < 0){
                        return flag;
                    }
                    if(result.order == 'desc' && flag > 0){
                        return flag;
                    }
                }
            })
        },
        compare(a,b,format,key){
            if(format == 'number' || format == 'decimal' || format == 'double'){
                return Number(a[key]) - Number(b[key]);
            }else if(format.indexOf('date')>=0){
                return new Date(a[key]).getTime() - new Date(b[key]).getTime();
            }
            else {
                var a_text = a[key]
                var b_text = b[key]
                if(a_text < b_text){
                    return -1;
                }else if(a_text > b_text){
                    return 1
                }
                return -0
            }
        },
        getValue(item,field) {
            //get cell computed value
            if(typeof field.callback == 'function') {
                item = field.callback(item)
                return item;
            }

            var s_exp = field.namespace.split('.');
            var namespace = field.namespace;
            var name = field.name.split('|')[0];
            if(!item[namespace]){
                return "";
            }
            return item[namespace][name];
            //deep search within namespace split by '.'
            //for(let [key, value] in s_exp) {
            //    item[name] = item[s_exp[key]][name];
            //}

            //return item;
        },
        createRow(type){
            var row = this.row;
            if(row && row.component){
                return row.component;
            }
            return 'data-row';
        },
        createHeader(type){
            var header = this.header;
            if(header && header.component){
                return header.component;
            }
            return 'header-row';
        },
        getHeadersEl(){
            return this.$el.querySelectorAll('.header-cell');
        },
        setRowFocus({row,model,focus}){
            var el = this.$el.querySelector(`#row-${row}`);
            if(!el){
                return;
            }

            if(focus){
                el.classList.add('is-active')
            }else{
                el.classList.remove('is-active')
            }
        }
    },
    mounted(){
        if(this.bus)
        {
            this.bus.$on('row-focus',this.setRowFocus);
        }
    },
    beforeDestroy(){
        this.bus.$off('row-focus',this.setRowFocus);
    },
    components:{
        'header-row':header_row,
        'data-row':data_row,
    }
}
</script>
