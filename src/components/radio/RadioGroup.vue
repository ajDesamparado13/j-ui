<template>
    <ui-field>
        <ui-control>
            <ui-radio v-for="(datum,index) in data" v-bind="datum"/>
        <ui-control/>
    </ui-field>
</template>
<script>
export default{
    name:'ui-radio-group',
    props:{
        data:{
            type:Array,
            required:true,
        }
    },
    methods:{
    },
}
</script>

