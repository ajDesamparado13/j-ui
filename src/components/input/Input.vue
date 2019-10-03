<template>
    <input
        class="input"
        v-on="$listeners"
        v-bind="$attrs"
        :type="type"
        :value="newValue"
        @keypress.enter="onEnter"
        >
</template>

    <script>
import config from '../config'
export default {
    name:'ui-input',
    model:{
        prop:'value',
        event:'update',
    },
    data() {
        return {
            preventUpdate:false,
            initialValue: this.value,
            newValue:'',
        };
    },
    props: {
        preventKeys:{
            type:Boolean,
            default:true,
        },
        maxlength:{
            type:[String, Number],
            required:false,
        },
        replaceOnInput:{ type:Boolean,default:false },
        toHalfWidth:{type:Boolean,default:false},
        isLowercase:{ type:Boolean, default:false},
        isUppercase:{ type:Boolean, default:false},
        defaultInputClass:{
            type:String,
            default:config.defaultInputClass,
        },
        value: {
            type: [String, Number],
            default: ''
        },
        type: {
            type: String,
            default: 'text' // all the possible HTML5 input types, except those that have a special UI
        },
        format:{
            type: String,
            default: 'text' // text,number,decimal,date|option
        },
        beforeUpdate:{
            type:Function,
            required:false,
        },
        beforeEnter:{
            type:Function,
            required:false,
        },
    },
    methods:{
        isEmpty(value){
            return this.$formatter.isEmpty(value);
        },
        onEnter(e) {
            var value = e.target.value;
            if(typeof this.beforeEnter == 'function'){
                value = this.beforeEnter(value);
            }
            this.setValue(value);
            this.$nextTick(()=>{
                this.$emit('keydown-enter', e);
            })
        },
        onKeydown(event) {
            if(this.$masks.only.is_special_key(event)){
                return;
            }
            var value = event.target.value;
            var maxlength = this.maxlength
            if(maxlength && value.length >= maxlength){
                return event.preventDefault();
            }
            switch(this.format){
                case 'number': return this.$masks.only.number_keys(event);break;
                case 'decimal': return this.$masks.only.decimal_keys(event);break;
            }
            if(this.format.indexOf('date') >= 0){
                this.$masks.only.date_keys(event)
            }
        },
        updateValue(event){
            if(event == undefined){
                return;
            }
            this.$nextTick(() => {
                var value = event.target.value
                this.setValue( value )
            })
        },
        /*
         * Set the raw value into formatted value
         */
        setValue(value){

            if(this.isEmpty(value)){
                this.newValue = '';
                return;
            }

            if(this.toHalfWidth){
                value = this.$formatter.toHalfWidth(value);
            }

            if(this.isLowercase){
                value = value.toLowerCase();
            }
            if(this.isUppercase){
                value = value.toUpperCase();
            }

            if(this.maxlength){
                var maxlength = Number(this.maxlength)
                value = value.substring(0,maxlength);
            }

            var format  = this.format;
            if(format == 'text'){
                this.newValue = value;
                return;
            }else{
                value = this.$formatter.format(value,format)
            }
            if(typeof this.beforeUpdate == 'function'){
                this.newValue = this.beforeUpdate(value);
            }else{
                this.newValue = value;
            }
            this.$forceUpdate();

        },
        /*
         * Get the unformatted value
         */
        getRaw(value){
            var format  = this.format;
            if(format == 'text' || this.type != 'text'){
                return value;
            }
            value = this.$formatter.getValue(value,format);
            return value;
        },
        clear(){
            this.preventUpdate = true;
            this.newValue = "";
            this.$nextTick(()=>{
                this.preventUpdate = false;
            })
        },
        reset() {
            // Blur the input if it's focused to prevent required errors
            // when it's value is reset
            if ( document.activeElement === this.$el) {
                document.activeElement.blur();
            }
            this.setValue(this.initialValue);
        },
    },
    watch:{
        /**
         * When v-model is changed:
         *   1. Set internal value.
         *   2. If it's invalid, validate again.
         */
        value(value) {
            var val = this.isEmpty(value) ? value : this.getRaw(value)
            if(this.getRaw(this.newValue) !== val){
                this.setValue(val);
            }
        },
        /*
         * When newValue is updated emit newValue to v-model
         *
         */
        newValue(value) {
            var val = this.isEmpty(value) ? value : this.getRaw(value)
            if(val !== this.getRaw(this.value) && !this.preventUpdate){
                this.$emit('update',val);
            }
        },
    },
    created() {
        var value = this.value;
        if (this.isEmpty(value)) {
            this.initialValue = '';
        }
        this.setValue(value);
    },
    mounted(){
        //if(this.format != 'text'){
        //this.$el.onchange = this.updateValue;
        //}else{
        this.$el.addEventListener('input',this.updateValue)
        //}
        if(this.preventKeys && this.format != 'text'){
            this.$el.addEventListener('keydown',this.onKeydown);
        }
        if(this.replaceOnInput){
            this.$el.addEventListener('focus',this.$el.select);
        }
    }
};
</script>
