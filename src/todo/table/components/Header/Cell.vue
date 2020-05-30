<template>
    <th class="header-cell"   :class="cellclass" :width="width" v-show="column.display != false">
        <component ref="compo" v-model="column.value" v-if="column.element" :is="getElement(column)" @click="onClick()" v-on="$listeners" v-bind="column.props"></component>
        <p ref="title" @click="onClick()" v-on="$listeners">
            {{text.value}}
            <ui-icon v-bind="icon" v-if="icon"></ui-icon>
            <ui-icon v-else-if="column.sortable" icon="angle-up"></ui-icon>
        </p>
        <component ref="slot" v-if="column.slot" :is="column.slot.element" v-html="column.slot.content" v-bind="column.slot.props"/>
    </th>
</template>

<script>
export default {
    name:'header-cell',
    data() {
        return {
            icon:'',
            order:"desc",
            is_clicked:false,
        }
    },
    watch:{
        order(val){
            if(val){
                this.column.order = val;
                this.icon = this.column.header_icon[val];
            }
        },
        column(col){
            if(col.order != this.order){
                this.order = col.order;
            }
        },
    },
    computed:{
        cellclass(){
            var column = this.column;
            var key = column.derived_key ? column.derived_key : column.name;
            return [
                `header-${key}`,
                {'is-clickable':this.sortable},
                {'is-fixed' : this.column.fixed}
            ]
        },
        width(){
            var width = this.column.width;
            if(width){
                return width+"%"
            }
        },
        sortable(){
            return Boolean(this.column.sortable);
        },
        text(){
            var column = this.column;
            return {
                value:column.label,
                icon:this.icon,
            }
        },
    },
    methods:{
        createCheckbox(){
            if(!this.bus){
                return "ui-checkbox";
            }
            this.bus.$on('check-all',()=>{
                if(this.is_clicked){
                    return this.is_clicked = false;
                }
                this.$refs['compo'].setValue(true);
            })
            this.bus.$on('uncheck-all',()=>{
                if(this.is_clicked){
                    return this.is_clicked = false;
                }
                this.$refs['compo'].setValue(false);
            })
            return "ui-checkbox";
        },
        getElement(field){
            var el = ""
            switch(field.element){
                    case 'checkbox':
                        el=this.createCheckbox();
                    break;
            }
            return el
        },
        onClick(){
            this.is_clicked = true;
            var column = this.column;
            if(this.sortable){
                var order = this.order
                //this.order = !order?"asc": order == 'asc'? "desc" : "";
                this.order = order == "desc" ? "asc": "desc";
                this.$emit('sort',column);
                var key = column.derived_key? column.derived_key : column.name;
                this.clickCall([key,this.order]);
                return;
            }
            this.clickCall();
        },
        clickCall(params)
        {
            var column = this.column;
            if(typeof column.header_click != 'function'){
                return;
            }
            params = Array.isArray(params)?params:[params];
            column.header_click(...params);
        },
        reset(){
            this.icon = "";
        },
    },
    props: {
        bus:{
            required:false,
        },
        column:{
            type:[ Object , String],
            default:'',
        }
    },
    created(){
        var column = this.column;
        var order = column.order;
        this.reset();
        if(column.sortable && column.order){
            this.order = order;
            this.icon = column.header_icon[column.order];
        }
    },
    mounted(){
        if(this.column.slot){
            this.$refs['title'].style.marginTop = this.$refs['slot'].clientHeight+"px";
        }
    },
}
</script>
<style lang="scss">
.header-cell{
    padding: 18px;
    border-left: 2px solid #ddd;
    line-height: 1.4em;
    overflow:hidden;
    white-space:nowrap;
    text-align: center;
    font-size:rem-calc(13px);
    color: #fff;
    @media only screen and (max-width: 768px){
        white-space: unset;
    }
}
</style>
