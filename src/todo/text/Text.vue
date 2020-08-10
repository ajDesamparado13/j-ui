<template>
    <div class="ui-text" @click="$emit('click', model ? model : value)" v-bind="$attrs" v-html="displayValue">
    </div>
</template>

<script>
import BaseText from '../BaseText'
import BaseUI from '../BaseUI'
import formatter from 'freedom-js-support/src/helpers/formatter';
export default{
    extends:BaseUI,
    name:'ui-text',
    data(){
        return{
        }
    },
    props:{
        model:{ required:false, },
        join:{type:String,default:''},
        break:{ type:Number,default:0, },
        //extends value, currency type
        color:{
            type:String,
            default:'black',
        },
        value: {
            type: [String, Number, Date, Object,Array],
            default: ''
        },
        role:{
            type:String,
            default:'default', //['default','lookup']
        },
        lookup:{
            type:Array,
            default:()=>{return[]},
        },
    },
    computed:{
        formatObject(){
          return formatter.getObjectParameters(this.format,{value:this.value})
        },
        default_value(){
            if(this.value === '-'){
                return this.value;
            }
            var type = this.type;
            var { format } = this.formatObject;
            if(type == 'text' && format != 'text' && !this.defaultStrict){
                return 0;
            }

            return this.defaultValue;
        },
        displayValue(){
            var displayValue = this.value;

            if(this.role == 'lookup'){
                var role = this.role;
                var options = this.lookup;
                var store = this.store;
                if(options.length==0 && Boolean( store.getter )){
                    var namespace = store.namespace;
                    var getter = store.getter;
                    if(namespace.indexOf('/') < 0 && namespace.length>0){
                        namespace = namespace+"/";
                    }

                    options = this.$store.getters[namespace+getter];
                    if(typeof options == 'function'){
                        options = options();
                    }
                }

                displayValue = options.find((opt)=>{
                    return opt.value == displayValue;
                });

                if(!Boolean(displayValue)){
                    displayValue = options.find((opt)=>{
                        return opt.default == true;
                    });
                }
                displayValue = displayValue.label;
            }

            if(formatter.isEmpty(displayValue))
            {
                displayValue = this.default_value;
                if(this.defaultStrict){
                    return displayValue;
                }
            }


            var type = this.type;
            var { format } = this.formatObject;
            var suffix = this.suffix;
            var prefix = this.prefix;

            if(type == 'text' && format != 'text'){
                displayValue = this.formatInto(displayValue);
            }

            if(type == 'text' && (Boolean(prefix) || Boolean(suffix))){
                displayValue = this.prefix + displayValue + this.suffix;
            }

            if(this.break){
                var length = displayValue.length * this.break;
                displayValue = displayValue.substring(0,length) + "\r\n" + displayValue.substring(length, displayValue.length);
            }

            if(typeof displayValue == 'string'){
                 displayValue = displayValue.replace(/(?:\r\n|\r|\n)/g, '<br />');
            }

            return displayValue;
        },
    },
    methods:{
        //extends format formatDate getNumberOnly formatNumber format Currency
    },
    mixins:[BaseText],
}
</script>
