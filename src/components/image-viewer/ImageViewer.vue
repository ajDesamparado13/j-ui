<template>
    <div class="image-viewer">
        <div class="image-controls" v-if="images.length>1">
            <div class="image-button previous-image">
                <ui-button @click="previous()"><i class="fa fa-lg fa-angle-double-left fa-custom"></i><<</ui-button>
            </div>
            <div class="image-select">
                <ui-select class="select-image" @change="jump(page)" v-model="page" :options="images"></ui-select>
            </div>
            <div class="image-button next-image">
                <ui-button @click="next()"><i class="fa fa-lg fa-angle-double-right fa-custom"></i>>></ui-button>
            </div>
        </div>
        <div class="image-preview" ref="image-preview-container">
            <image-canvas v-if="canvasReady" :tool="tool" :scale="scale" :width="width" :height="height" :src="image_preview"></image-canvas>
        </div>
        <div class="image-buttons" v-if="hasInteraction">
            <ui-icon-button :class="{'is-selected':tool=='zoom_in'}" size="small" @click="zoom_in()">
                <img :src="$_test.app_url+'imgs/icon-zoomin.svg'" width="20px" height="20px"/>
            </ui-icon-button>
            <ui-icon-button :class="{'is-selected':tool=='zoom_out'}" size="small" @click="zoom_out()">
                <img :src="$_test.app_url+'imgs/icon-zoomout.svg'" width="20px" height="20px"/>
            </ui-icon-button>
            <ui-icon-button :class="{'is-selected':tool=='pan'}" size="small" @click="pan()" >
                <img :src="$_test.app_url+'imgs/icon-pan.svg'" width="15px" height="15px"/>
            </ui-icon-button>
        </div>
    </div>
</template>

<script>
import image_canvas from './canvas'
export default {
    name:'image-viewer',
    data(){
        return {
            page:0,
            scale:100,
            tool:'arrow',
            canvasReady:false,
            width:500,
            height:500,
        }
    },
    props:{
        options:{
            type:Array,
            default:()=>{return[]}
        },
        display:{
            type:[Array,String],
            default:'name',
        },
        hasInteractions:{
            type:Boolean,
            default:false,
        }
    },
    computed:{
        image_preview(){
            var page = this.images[this.page];
            return typeof page == 'object'?page.location:page?page:'';
        },
        images(){
            var images=[];
            var list = this.options;
            var display = this.display;
            display = Array.isArray(display)?display:[display];

            for(let i in list){
                var item = list[i];
                if(typeof item == 'object'){
                    var number = Number(i)+1;
                    var label="";
                    for(let i in display){
                        label += item[display[i]]?item[display[i]]:display[i]
                    }
                    images.push({value:Number(i),label,location:item.location});
                }else{
                    images.push(item);
                }
            }
            return images;
        },
    },
    methods:{
        next(){
            var page = this.page;
            if(page == this.images.length-1)return;
            page = Number( page )+1;
            this.page = page;
        },
        previous(){
            var page = this.page;
            if(Number(page) ==0)return;
            page = Number( page )-1;
            this.page = page;
        },
        jump(page){
            this.page = page;
        },
        pan(){
            if(this.tool == 'pan'){
                this.tool = 'arrow'
                return;
            }
            this.tool = 'pan'
        },
        zoom_in(){
            var scale = this.scale;
            this.scale = scale+20;
            this.tool = 'zoom_in'
            //add action
        },
        zoom_out(){
            var scale = this.scale;
            this.scale = scale-20;
            this.tool = 'zoom_out'
            //add action
        },
        resizeCanvas(){
            if(this.$refs['image-preview-container'].clientHeight)
            this.height = this.$refs['image-preview-container'].clientHeight
            if(this.$refs['image-preview-container'].clientWidth)
            this.width = this.$refs['image-preview-container'].clientWidth
        },
    },
    mounted(){
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas, false);
        this.canvasReady = true;
    },
    components:{
        'image-canvas':image_canvas
    }
}
</script>

<style lang="scss">
.image-viewer{
    .image-controls {
        background: rgb(66, 134, 244);
        display:flex;
        justify-content:space-between;
        align-items:center;
        .previous-image{
            padding-right:10px;
        }
        .next-image{
            padding-left:10px;
        }
        .image-button{
            flex-grow:1;
            flex-shrink:1;
            display:flex;
            justify-content:center;
            padding:2px 0px;
            .ui-button{
                min-width:2em;
            }
            .ui-button:before{padding:0px;}
        }
        .image-select{
            flex-grow:3;
            flex-shrink:3;
            max-width:27vw;
            .select-image{
                background:#eee;
                padding:0 10px;
                .ui-select{
                    margin:0px;
                    border:0px;
                    .ui-select__display-value{
                        max-width:25vw;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                    }
                }
                .ui-select.is-active:not(.is-disabled) .ui-select__display{
                    border:0px;
                }
            }
        }
    }
    .image-preview{
        height:50vh;
        margin: 1em;
    }
    .image-buttons{
        display:flex;
        justify-content:center;
        background-color:#eee;
        .is-selected{
            background-color:pink;
        }
        .ui-icon-button{
            margin:0px 1em;
            border: 1px solid;
        }
        padding:0.50em;
    }
}
</style>
