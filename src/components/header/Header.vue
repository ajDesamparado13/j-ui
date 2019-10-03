<template>
    <div class="ui-header" :class="classes">
    </div>
</template>

<script>
import headeritem from './item'

export default{
    name:'ui-header',
    components:{
        'header-item':headeritem,
    },
}


</script>
