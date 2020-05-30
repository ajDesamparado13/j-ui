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

<style lang="scss">
.ui-sidebar{
    position:relative;
    @media only screen and (max-width:$bp-hands-wide){
        .ui-sidebar-menu{
            position:absolute;
            z-index:99999;
            top:100%;
        }
    }
    &.is-open{
        .ui-sidebar-menu{
            @media only screen and (max-width: $bp-hands-wide){
                display:block !important;
            }
        }
    }
    &.is-closed{
        @media only screen and (max-width:$bp-hands-wide){
            max-height:rem-calc(70px);
            .ui-sidebar-menu{
                display:none;
            }
        }
    }
    @media only screen and (min-width:$bp-hands-wide){
        min-height:100vh;
        flex-grow:1;
    }
    font-size:1rem;
    font-weight:bold;
    @media only screen and (max-width: $bp-hands-wide) {
        order: 1;
        width: 100%;
        min-width: 100%;
    }
    min-width:20vw;
    display:flex;
    flex-direction:column;
    background-color: $sidebar-bg;
    position: relative;

    .ui-logo-con {
        .ui-logo {
            margin-top:1.313rem;
            margin-bottom:2.063rem;
            max-width: 100%;
            display:flex;
            align-items:center;
            justify-content:center;
        }
        .title{
            color:#fff;
            text-align:center;
        }
        span {
            font-weight: bold;
            line-height: 2em;
        }
    }
    .ui-sidebar-menu{
        width:100%;
        @media only screen and (min-width: $bp-hands-wide){
            display:block !important;
        }
    }
    .ui-sidebar-burger{
        display: none;
        @media only screen and (max-width: $bp-hands-wide){
            display: inline-block;
            cursor: pointer;
            width: fit-content;
            position: absolute;
            margin-top: 1.313rem;
            left: 25px;
        }
        .burger-open{
            width: 30px;
            height: 3px;
            background-color: #fff;
            margin: 5px 0;
            transition: 0.4s;
        }
        .burger-close{
            width:30px;
            height:29px;
            transition: 0.4s;
            &:before, &:after {
                position: absolute;
                left: 13px;
                content: ' ';
                height: 29px;
                width: 2px;
                background-color: #fff;
            }
            &:before {
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }
        }
    }
    .sidebar-item{
        min-height:2rem;
        line-height: 2em;
        &.active{
            background-color:$sidebar-item-bg;
            border-right: 8px solid #f5f3ed;
            .sidebar-item-text{
                color:#fff;
            }
        }
        &:hover {
            background-color:rgba(255,255,255,0.2);
            border-right: 8px solid #f5f3ed;
            .sidebar-item-text{
                color:#fff;
            }
        }
        &.inactive{
            .sidebar-item-text{color:#83ab8d;}
            &:hover{
                color:#fff;
            }
        }
        .sidebar-item-text{
            font-size:13px;
            color: #fff;
            display: block;
            cursor:pointer;
            padding: 13.5px 0px 13.5px 50px;
            font-weight: bold;
            &.router-link-exact-active  {
                color: #f5f3ed;
                background-color: $sidebar-item-bg;
            }
        }
    }
}


</style>
