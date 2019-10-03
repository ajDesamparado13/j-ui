import config from './config'

export default {
    data(){
        return {
            handler_loading:false,

        }
    },
    props:{
        isFullWidth:{
            type:Boolean,
            default:false,
        },
        isOutlined:{
            type:Boolean,
            default:false,
        },
        color: {
            type: String,
            default: 'primary' // 'default', 'primary', 'accent', 'green', 'orange', or 'red'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        handler:{
            type:Function,
            required:false,
        },
        loading:{
            type:Boolean,
            default:false,
        },
        defaultClass:{
            type:String,
            default: config.defaultButtonClass,
        },
        noDefaultClass:{
            type:Boolean,
            default:false,
        }
    },
    computed: {
        is_loading(){return this.handler_loading || this.loading},
        is_disabled(){ return this.is_loading || this.disabled},
        classes() {
            var classes = [
                `is-${this.color}`,
                { 'is-loading': this.is_loading},
                { 'is-disabled' : this.is_disabled},
                { 'is-outlined' : this.isOutlined},
                { 'is-fullwidth' : this.isFullWidth},
            ]
            if(!this.noDefaultClass){
                classes.unshift(this.defaultClass);
            }
            return classes;
        },
    },
    methods:{
        onClick(){
            if(typeof this.handler != 'function'){
                return;
            }
            this.handler_loading = true;
            var promise = this.handler();
            if(promise && typeof promise.then == 'function'){
                promise.then(()=>{this.handler_loading = false});
            }else{
                this.handler_loading = false;
            }
        },
    }
}
