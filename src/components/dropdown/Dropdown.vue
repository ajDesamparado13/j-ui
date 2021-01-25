<template>
<div class="ui-dropdown dropdown">
    <div role="button" ref="trigger" class="dropdown-trigger" @click="toggle">
        <slot name="trigger"></slot>
    </div>
    <transition name="fade">
        <div class="dropdown-content box" ref="content" v-show="isActive && show">
            <slot @close="close"> </slot>
        </div>
    </transition>
</div>
</template>
<script>
export default {
    name:'ui-dropdown',
    props:{
        disabled:Boolean,
        hoverable:Boolean,
        show:{
            type:Boolean,
            default:true,
        },
    },
    data(){
        return {
            isActive:false,
        }
    },
    methods:{
        open(){
            this.$nextTick(()=>{
                this.isActive = true;
            });
        },
        close(){
            this.isActive = false;
        },
        clickedOutside (event) {
            if (!this.isInWhiteList(event.target))
            this.close()
        },
        isInWhiteList (el) {
            if (el === this.$refs.content || el === this.$refs.trigger) return true
            // All chidren from dropdown
            if (this.$refs.content !== undefined) {
                const children = this.$refs.content.querySelectorAll('*')
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            // All children from trigger
            if (this.$refs.trigger !== undefined) {
                const children = this.$refs.trigger.querySelectorAll('*')
                for (const child of children) {
                    if (el === child) {
                        return true
                    }
                }
            }
            return false
        },
        toggle(){
            if(this.disabled || this.hoverable){
                return;
            }
            return this.isActive ? this.close() : this.open();
        },
    },
    created(){
        if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside)
        }
    },
    beforeDestroy () {
        if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside)
        }
    }

}
</script>

<style lang="scss">
.ui-dropdown{
    width:100%;
    position: relative;
    .dropdown-trigger{
        width:100%;
    }
    .dropdown-content{
        width:100%;
        min-width:450px;
        position: absolute;
        top: 100%;
        z-index: 20;
        left:0px;
    }
}
</style>