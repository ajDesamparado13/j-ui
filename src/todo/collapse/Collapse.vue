<template>
    <div class="ui-collapse collapse" :class="classes">
        <div class="collapse-trigger" @click="toggle()">
            <ui-icon v-if="!hasTrigger && defaultTrigger" :icon="defaultTriggerIcon"></ui-icon>
            <slot name="trigger" :open="isOpen" />
        </div>
        <transition :name="animation">
            <div class="collapse-content" v-show="isOpen">
                <slot/>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'ui-collapse',
        props: {
            open: {
                type: Boolean,
                default: true
            },
            animation: {
                type: String,
                default: 'fade'
            },
            defaultTrigger:{
                type:Boolean,
                default:true,
            },
        },
        computed:{
            defaultTriggerIcon(){
                return this.isOpen? 'chevron-up' : 'chevron-down';
            },
            hasTrigger(){
                return this.$slots.trigger;
            },
            classes(){
                return [
                    { 'is-open' : this.isOpen},
                    { 'is-closed' : !this.isOpen},
                ]
            },
        },
        data() {
            return {
                isOpen: this.open
            }
        },
        watch: {
            open(value) {
                this.isOpen = value
            }
        },
        methods: {
            /**
             * Toggle and emit events
             */
            toggle() {
                this.isOpen = !this.isOpen
                this.$emit(this.isOpen ? 'open' : 'close')
            }
        }
    }
</script>

<style lang="scss">
.ui-collapse{
    position:relative;
    .collapse-trigger{
        width:36px;
        height:36px;
        display:flex;
        justify-content:center;
        align-items:center;
        position:absolute;
        top:1px;
        right:1px;
        cursor:pointer;
        padding:5px 10px;
        border-radius:50%;
        border:none;
        &:hover:not(.is-disabled) {
            background-color: rgba(black, 0.1);
        }
    }

    &.is-close{
        .collapse-trigger{
        }
    }
}
</style>
