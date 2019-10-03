<template>
    <a v-bind="$attrs" v-on="$listeners" :disabled="is_disabled" @click="onClick" :class="classes">
        <slot></slot>
    </a>
</template>


<script>
import BaseButton from '../BaseButton'
import config from '../config'
export default {
    extends:BaseButton,
    name:'ui-link',
    props:{
        defaultClass:{
            type:String,
            default: config.defaultLinkClass,
        },
        noDefaultClass:{
            type:Boolean,
            default:false,
        },
    },
}

</script>
