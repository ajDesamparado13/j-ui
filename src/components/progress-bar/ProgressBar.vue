<template>
    <div class="ui-progress-bar" id="ui-progress-bar">
        <ui-progress-linear v-bind="{type}"></ui-progress-linear>
    </div>
</template>

<script>
import {ProgressLinear} from '../progress'
export default {
    name:'ui-progress-bar',
    data(){
        return {
            block_process:'',
            block_message:'',
        }
    },
    props:{
        type:{
            type:String,
            default:'indeterminate',
        },
        message:{
            type:String,
            default:'',
        },
        progress:{
            type:[String,Number],
            default:"",
        },
        loading:{
            type:Boolean,
            default:false,
        },
    },
    methods:{
        close(){
            setTimeout(()=>{
                var block=document.getElementById('ui-progress-bar');
                document.body.removeChild(block);
            },300)
        },
        setProgress(progress){
            this.block_process = progress;
        },
        setMessage(message){
            this.block_message = message;
        }
    },
    beforeMount(){
        document.body.appendChild(this.$el);
    },
    created(){
        this.block_process = this.progress
        this.block_message = this.message
    },
    components:{
        'ui-progress-linear':ProgressLinear,
    },
}
</script>

<style lang="scss">
.ui-progress-bar{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index:99;
}
</style>
