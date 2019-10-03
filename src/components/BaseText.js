export default{
    data(){
        return{
        }
    },
    props:{
        divider:{
            type:Number,
            default:1,
        },
        multiplier:{
            type:Number,
            default:1,
        },
        suffix:{
            type:String,
            default:'',
        },
        prefix:{
            type:String,
            default:'',
        },
        value: {
            type: [String, Number, Date, Object],
            default: ''
        },
        currency:{
            type:String,
            default:'¥',
        },
        type:{
            type:String,
            default:'text',
        },
        format: {
            type: String, default: 'text' // all the possible HTML5 input types, except those that have a special UI
        },
        defaultValue:{
            type:String,
            default:'',
        },
        defaultStrict:{
            type:Boolean,
            default:false,
        }
    },
    computed:{
        default_value(){
            var type = this.type;
            var format = this.format;
            if(type == 'text' && format != 'text' && !this.defaultStrict){
                return 0;
            }

            return this.defaultValue;
        },
        displayValue(){
            var displayValue = this.value;

            if(!Boolean(displayValue))
            {
                displayValue = this.default_value;
                if(this.defaultStrict){
                    return displayValue;
                }
            }

            var type = this.type;
            var format = this.format;
            var suffix = this.suffix;
            var prefix = this.prefix;

            if(type == 'text' && format != 'text'){
                displayValue = this.formatInto(displayValue,format);
            }

            if(type == 'text' && (Boolean(prefix) || Boolean(suffix))){
                displayValue = this.prefix + displayValue + this.suffix;
            }

            return displayValue;
        }
    },
    methods:{
        formatInto(value,format,type = this.type){
            if(format == 'number' || format == 'decimal' || format == 'currency'){
                var multiplier = this.multiplier;
                var divider = this.divider;
                if(typeof divider == 'number' && divider != 1){
                    value = value / this.divider;
                }
                if(typeof multiplier == 'number' && multiplier != 1){
                    value = value * this.multiplier;
                }
            }
            value = this.$formatter.format(value,format);
            return value;
        },
        getNumberOnly(value){
            return this.$formatter.getNumberOnly(value);
        },
    },
}
