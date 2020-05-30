<template>
    <div class="pdf-viewer">
        <iframe type="application/pdf" frameborder="0" width="100%" height="100%":src="src"></iframe>
    </div>
</template>


<script>
export default {
    name:'pdf-viewer',
    props:{
        src:{
            type:String,
            default:'',
        }
    },
}
</script>


<style lang="scss">
.pdf-viewer{
    width:100%;
    height:100%;
    iframe{
        width:100%;
        height:100%;
        overflow-y:hidden;
        overflow-x:hidden;
    }
}

</style>
