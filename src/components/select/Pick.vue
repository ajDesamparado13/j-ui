<template>
    <select class="select" ref="select"
        v-on="$listeners"
        v-bind="$attrs"
        :class="classes"
        :value="newValue"
        @input="updateValue"
        >
        <option v-if="placeholder" value="" selected disabled hidden>{{ placeholder }}</option>
        <option v-if="isObject" v-for="(opt,index) in options" :value="opt[keys.value]">{{opt[keys.label]}}</option>
        <option v-else v-for="(opt,index) in options" :value="opt">{{opt}}</option>
    </select>
</template>

<script>
export default {
    name:'ui-pick',
    model:{
        prop:'value',
        event:'update',
    },
    data(){
        return {
            newValue:'',
        }
    },
    watch:{
        value(value){
            var val = this.getValue(value)
            if(this.newValue != val){
                this.newValue = val;
            }
        },
    },
    props: {
        keys:{
            type:Object,
            default:()=>{return { label:'label', value:'value',}}
        },
        value: {
            required: true
        },
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        placeholder: String,
        objectify:{
            type:Boolean,
            default:false,
        },
    },
    computed:{
        classes(){
            return [
                { 'is-placeholder': (typeof this.value != 'number') && !Boolean(this.value) },
            ]
        },
        isObject(){
            return typeof this.options[0] == 'object'
        },
    },
    methods:{
        updateValue(event){
            var keys = this.keys;
            var val = event.target.value;
            this.newValue = val;

            var value = this.objectify ? this.getObject(val) : this.getValue(val);
            this.$emit('update',value);
        },
        getValue(value){
            if(!value)return;
            var keys = this.keys;
            var isObject = typeof value == 'object'
            value = isObject?value[keys.value]:value;
            if(isObject){
                return value;
            }
            //check if value is not prefixed by 0
            if(value[0] != "0" || value == 0 ){
                var number = Number(value)
                value = !isNaN(number) && value[0]?number:value;
            }

            return value;
        },
        getObject(value){
            var keys = this.keys;
            var isObject = typeof value == 'object'
            value = isObject?value[keys.value]:value;

            return this.options.find((item)=>{return item[keys.value].toString() == value.toString()});
        }
    },
    created(){
        this.newValue = this.getValue(this.value);
    },
}
</script>

