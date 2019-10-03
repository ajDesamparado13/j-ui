<template>
    <div class="ui-title" :class="uiclasses">
        <ui-icon v-bind="srcIcon" v-if="srcIcon.icon"></ui-icon>
        <h1 :class="`title is-${size}`">
            <slot></slot>
        </h1>
        <div class="title-addon" v-if="this.$slots['addon']">
            <slot name="addon"></slot>
        </div>
        <div class="title-extra" v-if="this.$slots['extra']">
            <slot name="extra"></slot>
        </div>
    </div>
</template>


<script>
export default {
    name:'ui-title',
    props:{
        size:{
            type:Number,
            default:1,
        },
        iconPosition:{
            type:String,
            default:'left',
        },
        icon:{
            type:[ String,Object ],
            default:'',
        },
    },
    computed:{
        srcIcon(){
            return this.icon.icon?this.icon:{icon:this.icon};
        },
        uiclasses() {
            return [
                {reverse:this.iconPosition=='right'}
            ]
        },
    }
}
</script>
