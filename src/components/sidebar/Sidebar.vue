<template>
    <div class="ui-sidebar" :class="classes">
        <div class="ui-logo-con">
            <div class="ui-logo">
                <router-link :to="logoLink">
                    <img v-if="logo" :src="logo">
                    <h1 v-else class="title is-1">{{title}}</h1>
                </router-link>
            </div>
        </div>
        <slot name="top"></slot>
        <!--- Mobile View Only --->
        <div class="ui-sidebar-burger" @click="toggleMenu">
            <div v-for="n in 3" v-show="!show" class="burger-open"></div>
            <div v-show="show" class="burger-close"></div>
        </div>

        <div  v-for="(menu,index) in menus" class="ui-sidebar-menu"
            :class="menu.class" v-show="menu.show != false && show">

            <sidebar-item @click="() => show = false" v-for="(item,index) in menu"
              v-if="item.if != false" v-show="item.show != false" :key="index" v-bind="item"
                >
            </sidebar-item>
        </div>
        <slot name="bottom"></slot>
    </div>
</template>

<script>
import sidebaritem from './item'

export default{
    name:'ui-sidebar',
    data(){
        return{
            show:false,
        }
    },
    computed:{
        classes(){
            return [
                {'is-open' : this.show},
                {'is-closed' : !this.show},
            ]
        },
    },
    props:{
        logoLink:{
            type:Object,
            default:()=>{return { name: 'home' }},
        },
        logo:{
            type:String,
            default:"",
        },
        menus:{
            type:Array,
            default:()=>{return []},
        },
        title:{
            type:String,
            default:'',
        }
    },
    methods:{
        toggleMenu(){
            this.show = !this.show;
        }
    },
    components:{
        'sidebar-item':sidebaritem,
    },
}


</script>
