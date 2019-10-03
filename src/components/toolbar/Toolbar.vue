<template>
    <div class="ui-toolbar">
        <div :class="`ui-toolbar__brand is-${brandPosition}`" v-show="hasBrand">
            <slot name="brand">
                <ui-title v-if="brand" :icon="icon">
                        {{ brand }}
                </ui-title>
                <img v-if="logo" :src="logo">
            </slot>
        </div>

        <div class="ui-toolbar__body">
            <slot>
                <h2 class="ui-toolbar__title title is-1" v-if="title">{{ title }}</h2>
            </slot>
        </div>

        <div :class="`ui-toolbar__actions is-${actionPosition}`" v-show="hasActions">
            <slot name="actions"></slot>
        </div>

    </div>
</template>


<script>
import title from '../title'
export default {
    name:'ui-toolbar',
    props:{
        title:String,
        brand:String,
        logo:String,
        icon:{
            type:[String,Object],
            default:'',
        },
        actionPosition:{
            type:String,
            default:'right',
        },
        brandPosition:{
            type:String,
            default:'left',
        },
    },
    computed:{
        hasBrand(){
            return Boolean(this.brand) || !!this.$slots['brand'] || Boolean(this.logo);
        },
        hasActions(){
            return !!this.$slots['actions'];
        }
    },
    components:{
        'ui-title':title,
    }
}
</script>
