<template>
    <td class="cell-checkbox">
        <ui-checkbox :key="model.id" :trueValue="model" :isInverse="isInverse" ref="checkbox" v-bind="field.props" v-on="field.events" v-model="field.list"></ui-checkbox>
    </td>
</template>

<script>
export default {
    name:'cell-checkbox',
    data() {
        return {
            mode:'normal'
        }
    },
    computed:{
        isInverse(){
            return this.mode != 'normal';
        },
    },
    props: {
        bus:{
            required:false,
        },
        model:{
            type:Object,
            required:true,
        },
        field:{
            type:[Object,String],
            required:true,
        },
        value:{
            type:[Boolean,Object,String,Number],
            default:false,
        },
    },
    created()
    {
        if(this.bus){
            this.bus.$on('check-all',()=>{
                if(this.$refs['checkbox']){
                    this.$refs['checkbox'].setValue(true);
                }
                this.mode = 'check-all';
            })
            this.bus.$on('uncheck-all',()=>{
                if(this.$refs['checkbox']){
                    this.$refs['checkbox'].setValue(false);
                }
                this.mode = 'normal';
            })
        }
    },
}
</script>

<style lang="scss">
.cell-checkbox{
    .ui-checkbox__checkmark{
        margin:0 auto;
    }
}
</style>
