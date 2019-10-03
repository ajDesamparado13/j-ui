<template>
    <tr :id="`row-${value[primaryKey]}`" class="ui-table-row-data" :class="uiclass" @mouseover="focus(true)" @mouseleave="focus(false)">
        <component v-if="field.if != false" v-for="(field,index) in columns"
            v-show="field.show != false"
            v-bind={field}
            :bus="bus"

            :value="value[getKey(field)]"
            :model="value"
            :key="getKey(field)"

            :is="getElement(field)"
        >
        </component>
    </tr>
</template>

<script>
import CellData from '../Cell/Data'
import CellCheckbox from '../Cell/Checkbox'

export default{
    name:'ui-table-row-data',
    data() {
        return {
            is_focus:false,
        }
    },
    computed:{
        uiclass(){
            var classes = this.classes;
            var prop_classes = [];
            var model = this.value;
            if(classes && typeof classes == 'object'){
                for(let key in classes){
                    var _class = classes[key];
                    var val = "";
                    if(_class){
                        if(typeof _class == 'function'){
                            val = _class(model);
                        }else{
                            val = _class;
                        }
                    }
                    if(!Array.isArray(classes)){
                        val = val === true ? key : '';
                    }
                    if(val){
                        prop_classes.push(val);
                    }
                }
            }
            var classes = [
                { 'is-active' : this.focusable && this.is_focus}
            ]
            classes  = classes.concat(prop_classes);
            return classes;
        },
    },
    props: {
        primaryKey:{
            type:String,
            default:'id',
        },
        bus:{
            required:false,
        },
        focusable:{
            type:Boolean,
            default:false,
        },
        columns: {
            type: Array,
            required: true
        },
        value:{
            type:Object,
            required:true,
        },
        index:{
            type:Number,
            required:true,
        },
        classes:{
            type:Object,
            required:false,
        },
    },
    methods: {
        focus(flag){
            this.is_focus = flag;
            var value = this.value;
            this.bus.$emit('row-focus',{ row:value[this.primaryKey], model:this.value , focus:flag});
        },
        getKey(field){
            return !field.namespace ? field.name : field.namespace.replace('.','_') + '_' + field.name;
        },
        getElement(field){
            var el = ""
            switch(field.element){
                    case 'checkbox':el="cell-checkbox";break;
                    default:el='cell-data';break;
            }
            return el
        }
    },
    components:{
        'cell-data':CellData,
        'cell-checkbox':CellCheckbox,
    },
}
</script>
