<template>
    <div class="header-item" @click="onClick" :class="{'is-active':isActive}">
        <slot></slot>
    </div>
</template>

<script>
export default{
    name:'header-item',
    props:{
        iconLeft:{
            type:[String,Object],
            required:false,
        },
        iconRight:{
            type:[String,Object],
            required:false,
        },
        sub:{
            type:Array,
            default:()=>{return[]},
        },
        type:{
            type:String,
            default:'link', //values ['link','event','callback']
        },
        action:{
            type:Object,
            default:()=>{return{}}
        },
        label:{
            type:String,
            default:'',
        },
    },
    computed:{
        isClickable(){
            var action = this.action;
            if(Object.keys(action).length==0){
                return 'no-click';
            }

            if(this.$route.name == action.name && this.type == 'link'){
                return 'no-click';
            }

            return 'clickable';
        },
        isActive(){
            var action = this.action;
            if(Object.keys(action).length == 0){
                return false;
            }

            if(this.type == 'link' && Object.keys(action).length > 0){
                return this.$route.name == action.name
            }

            return true
        },
    },
    methods:{
        onClick(){
            if(this.isClickable != 'clickable'){
                return;
            }
            var type = this.type;
            var action = this.action;

            switch(type){
                case 'event':
                    this.$emit(action.name,action.payload);
                    break;
                case 'callback':
                    if(typeof action.callback == 'function'){
                        action.callback();
                    }
                    break;
                case 'link':
                    this.$router.push(action);
                    break;
            }
        }
    },
    beforeCreate(){
        this.$options.components.item = require('./item.vue')
    }
}
</script>
