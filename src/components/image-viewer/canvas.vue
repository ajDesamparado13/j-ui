<template>
    <div class="image-preview-canvas">
        <canvas ref="image-canvas"
            class="image-board"
            :style="drawing_style"
            :width="width"
            :height="height"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @mousemove="handleMouseMove">
        </canvas>
    </div>
</template>
<script>
export default{
    name:'image-board',
    data(){
        return {
            image_ctx:'',
            mouse: {
                current: {
                    x: 0,
                    y: 0
                },
                previous: {
                    x: 0,
                    y: 0
                },
                down: false
            },
            origin:{
                x:0,
                y:0,
            },
            image_loaded:false,
            zoomIntensity:0.2,
            image:new Image(),
        }
    },
    props:{
        height:{
            type:Number,
            default:500,
        },
        width:{
            type:Number,
            default:500,
        },
        src:{
            type:String,
            default:''
        },
        scale:{
            type:Number,
            default:100,
        },
        tool:{
            type:String,
            default:'arrow'
        },
    },
    computed: {
        currentMouse() {
            var canvas = this.image_ctx.canvas;
            var rect = canvas.getBoundingClientRect();
            var current = this.mouse.current;
            var mouse = {
                x:current.x-rect.left,
                y:current.y-rect.top,
            }
            return mouse;
        },
        image_size(){
            var image=this.image,newWidth=this.width,newHeight=this.height;
            if(this.image_loaded){
                image = {
                    width:image.width?image.width:newWidth,
                    height:image.height?image.height:newHeight,
                }
                var flag="default"
                var ratio = image.width / image.height;
                if(image.width >= image.height){
                    if(image.width <= newWidth){
                        newWidth = image.width;
                    }
                    flag = "height"
                }else{
                    if(image.height <= newHeight){
                        newHeight = image.height;
                    }
                    flag = "width"
                }

                if(flag == 'width'){
                    newWidth = ratio>1?newHeight/ratio:newHeight*ratio;
                }else if(flag == 'height'){
                    newHeight = ratio>1?newWidth/ratio:newWidth*ratio;
                }

                if(newHeight>this.height){
                    newHeight = this.height;
                    newWidth = ratio>1?newHeight/ratio:newHeight*ratio;
                }

                if(newWidth > this.width){
                    newWidth = this.width;
                    newHeight = ratio>1?newWidth/ratio:newWidth*ratio;
                }
            }
            return {width:newWidth, height:newHeight,}
        },
        scaled_image_size(){
            var image_size = this.image_size, scale = this.scale;
            scale = scale - 100;
            scale = scale/100;
            var newWidth = image_size.width+Math.floor(image_size.width*scale)
            var newHeight = image_size.height+Math.floor(image_size.height*scale)
            return {width:newWidth, height:newHeight,}
        },
        drawing_style(){
            var tool = this.tool;
            var state = !this.mouse.down?'down':'move';
            return ''
            //var cursors = this.cursors['default'];
            //var image={};
            //switch(tool){
            //    case 'pan':
            //    case 'hand':image=cursors.hand_image;break;
            //    case 'pointer':
            //    case 'arrow':
            //    default:image='';break;
            //}
            //if(typeof image == 'object'){
            //    image = image[state];
            //}
            //return `cursor:url(${image}),auto;`
        },
    },
    watch:{
        width(newValue){
            setTimeout(()=>{this.load()},2000);
        },
        height(newValue){
            setTimeout(()=>{this.load();},2000);
        },
        src(new_value){
            this.init();
            this.image = new Image();
            this.image.src = new_value;
            this.image.addEventListener("load",()=>{this.image_loaded=true;this.load();})
        },
        scale(scale){
            this.load();
        },
    },
    methods: {
        pan(){
            var current = this.currentMouse;
            var last = this.mouse.previous;
            this.origin.x = this.origin.x + (current.x - last.x);
            this.origin.y = this.origin.y + (current.y - last.y);
            this.mouse.previous = current;
            this.load();
        },
        load(redraw=true,ctx=this.image_ctx){
            return new Promise((resolve,reject)=> { if(!redraw){resolve();}
                ctx.clearRect(0, 0, this.width, this.height);
                ctx.drawImage(this.image,this.origin.x,this.origin.y,this.scaled_image_size.width,this.scaled_image_size.height);
                resolve();
            })
        },
        clear(clear=""){
            if(clear.indexOf('image') != -1 || clear.length == 0){
                this.image_ctx.clearRect(0,0,this.width,this.height);
            }
        },
        handleMouseDown(event) {
            var currentMouse = this.currentMouse;
            var mouse = this.mouse;
            mouse.down = true;
            mouse.current = { x: event.clientX, y: event.clientY }
            mouse.previous = currentMouse;
            this.mouse = mouse;
        },
        handleMouseUp() {
            this.mouse.down = false
        },
        handleMouseMove(event) {
            this.mouse.current = {x:event.clientX,y:event.clientY}
            if(!this.mouse.down)return;
            switch(this.tool){
                case 'pan':this.pan();break;
            }
        },
        init(clear=false){
            this.origin = { x:0, y:0 }
            if(clear)this.clear();
            this.image_loaded=false;
        },
    },
    created(){
        this.init();
    },
    mounted() {
        var image_canvas = this.$refs['image-canvas'];
        var ctx = image_canvas.getContext("2d");
        ctx.translate(0.5, 0.5);
        ctx.imageSmoothingEnabled= false;
        this.image_ctx = ctx;

        this.image.src = this.src;
        this.image.addEventListener("load",()=>{this.image_loaded=true;this.load();})
    },
}
</script>

<style lang="scss">
.image-preview-canvas{
    display:flex;
    justify-content:center;
    .image-board{
        border: 1px solid red;
    }
}
</style>
