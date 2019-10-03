<template>
    <td class="cell-data" :class="cellclass">
        <component v-if="field.if != false && typeof display_text != 'undefined' && (field.type || field.component)"
                   v-bind="field.props"
                   v-on="field.events"
                   v-show="field.show != false"
                   :is="getComponent()"
                   :model="model"
                   :value="display_text"
        > </component>
        <p @click="field.events.click(model)" v-bind="field.props" v-show="field.show != false" v-else>{{ display_text ?
            display_text : default_value}}</p>
    </td>
</template>

<script>
export default{
    name:'cell-data',
    computed:{
        default_value(){
            var field = this.field;
            return field.defaultValue ? field.defaultValue : '-';
        },
        cellclass(){
            var field = this.field;
            var key = field.derived_key ? field.derived_key : field.name;
            var is_clickable = field.events ? typeof field.events.click == 'function' : false;

            var classes = [
                `cell-${key}`,
                 { 'is-clickable': is_clickable }
            ]
            if(Array.isArray( field.classes )){
                classes = classes.concat(field.classes);
            }
            return classes;
        },
        display_text(){
            var display_text = this.value;
            var field = this.field;

            if(Array.isArray(display_text)){
                var cleaned = display_text.filter((item)=>{return item});
                if(field.break){
                    var clone = cleaned.slice(0);
                    var n_break = field.break > clone.length ? clone.length : field.break;
                    var start = 0;
                    var end = n_break;
                    cleaned  = [];
                    while(start != clone.length){
                        cleaned.push(clone.slice(start,end));
                        start = end;
                        end = end+n_break;
                        end = end > clone.length ? clone.length : end;
                        stop = end == clone.length;
                    }
                }

                if(field.join){
                    if(typeof field.join == 'function'){
                        display_text = field.join(display_text);
                    }else if(typeof field.join == 'string'){
                        display_text = cleaned.join(field.join);
                    }
                }
            }
            return display_text ? display_text : undefined;
        },
    },
    methods:{
        getComponent(){
            var field = this.field;
            if(field && field.component){
                return field.component;
            }
            var component = "";
            switch(field.type){
                case 'text': component="ui-text";break;
            }
            return component;
        },
    },
    props: {
        model:{
            type:Object,
            required:true,
        },
        field:{
            type:[Object,String],
            required:true,
        },
        value:{
            type:[String,Number,Object,Array,Boolean],
            default:()=>{ return ''; }
        },
    },
}
</script>

<style lang="scss">
.cell-data{
    &.clickable{
        span{
            cursor:pointer;
        }
    }
    &.no-wrap{
        white-space:nowrap;
        @media only screen and (max-width: 768px){
            white-space: unset;
            word-break: break-all;
        }
    }
    &.text-ellipsis{
        span{
            max-width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display:block;
        }
    }
}
</style>
