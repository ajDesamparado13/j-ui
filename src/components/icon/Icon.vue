<template>
    <span class="icon ui-icon" :class="[newType,newSize,]" :aria-label="ariaLabel" v-bind="{ style }">
        <svgicon v-if="useSvg" :class="[newSize]" :name="icon" v-bind="$attrs"/>
        <img v-else-if="useImg"  :src="icon" v-bind="$attrs" />
        <i v-else :class="[newPack, newIcon, newCustomSize, customClass]"/>
    </span>
</template>

    <script>
export default {
    name: 'ui-icon',
    props: {
        type: String,
        icon: String,
        size: {
            type:String,
            default:'small'
        },
        customSize: String,
        customClass: String,
        icon: String,
        pack: {
            type: String,
            default: 'fa'
        },
        ariaLabel: String,
        useSvg: {
            type: Boolean,
            default: false
        },
        useImg:{
            type: Boolean,
            default: false
        },
        fontSize:{
            type:Number,
            required:false,
        },
        width:{
            type:Number,
            required:false,
        },
        height:{
            type:Number,
            required:false,
        },
    },
    watch:{
        value(){
            this.$forceUpdate();
        }
    },
    data() {
        return {
            newPack: this.pack
        }
    },
    computed:{
        style(){
            var style = "";
            if(this.fontSize){
                style += `font-size:${this.fontSize}px;`;
            }
            if(this.width){
                style += `width:${this.width}px;`;
            }
            if(this.height){
                style += `height:${this.height}px;`;
            }
            return style;
        },
        newSize(){ return this.size?`is-${this.size}`:'' },
        /**
         * Internal icon name based on the pack.
         * If pack is 'fa', gets the equivalent FA icon name of the MDI,
         * internal icons are always MDI.
         */
        newIcon() {
            return `${this.newPack}-${this.icon}`
        },
        newType() {
            if (!this.type) return

            const splitType = this.type.split('-')
            if (!splitType.length) return

            return `has-text-${splitType[1]}`
        },
        newCustomSize() {
            return this.customSize || this.customSizeByPack
        },
        customSizeByPack() {
            var pack = this.newPack;
            const defaultSize = pack === 'mdi'
                ? 'mdi-24px'
                : pack === 'fa' ? ' fa-lg'
                : `${pack}-lg`

            const mediumSize = pack === 'mdi'
                ? 'mdi-36px'
                : pack === 'fa' ? 'fa-2x'
                : `${pack}-md`

            const largeSize = pack === 'mdi'
                ? 'mdi-48px'
                : pack == 'fa' ? 'fa-3x'
                : `${pack}-lg`

            switch (this.newSize) {
                case 'is-small': return
                case 'is-medium': return mediumSize
                case 'is-large': return largeSize
                default: return defaultSize
            }
        }
    },
};
</script>