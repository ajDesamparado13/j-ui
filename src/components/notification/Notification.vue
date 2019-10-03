<template>
    <transition name="fade">
    <article
        class="ui-notification notification"
        :class="classes">
        <button
            v-if="dismissible"
            class="delete"
            @click="close"
            />
            <div class="media">
                <div v-if="icon && hasIcon" class="media-left">
                    <ui-icon
                        :icon="icon"
                        both
                        size="is-large"/>
                </div>
                <div class="media-content" v-html="message"> </div>
            </div>
    </article>
    </transition>
</template>

<script>
import UiIcon from '../icon/Icon'
export default {
    name: 'ui-notification',
    data(){
        return {
            previous_style:'',
            timer:null,
        }
    },
    props: {
        closeOnRouteChange:{
            type:Boolean,
            default:true,
        },
        autoClose:{
            type:Boolean,
            default:true,
        },
        time:{
            type:Number,
            default:5000,
        },
        message:{
            type:String,
            default:'',
        },
        onClose:{
            type:Function,
            required:false,
        },
        focus:{
            type:Function,
            required:false,
        },
        type: {
            type: String,
            default: 'info' // 'info', 'success', 'warning', or 'error'
        },
        dismissible: {
            type: Boolean,
            default: true
        },
        icon:{
            type:String,
            default:'',
        },
        container: HTMLElement,
        isProgrammatic:{
            type:Boolean,
            default:false,
        },
    },
    computed: {
        classes() {
            return [
                `is-${this.type}`
            ];
        }
    },
    methods: {
        removeElement(el) {
            if (typeof el.remove !== 'undefined') {
                el.remove()
            } else {
                el.parentNode.removeChild(el)
            }
        },
        close(){
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.$emit('close',this._uid);
            if(typeof this.onClose == 'function'){
                this.onClose();
            }
            if(this.container){
                this.container.style = this.previous_style;
            }
            if(this.isProgrammatic){
                this.$destroy();
                this.removeElement(this.$el);
            }
            return null;
        },
    },
    mounted(){
		if(typeof this.focus == 'function'){
			this.focus();
		}
        if(this.autoClose && this.time){
            this.timer = setTimeout(this.close,this.time);
        }
    },
    beforeMount(){
        if (!this.container) {
            document.body.appendChild(this.$el);
        } else {
            this.previous_style = this.container.style;
            if(!this.isProgrammatic){
                this.container.style="position:relative;"
            }
            this.container.insertBefore(this.$el,this.container.firstChild)
        }
    },
    components:{
        'ui-icon':UiIcon,
    }
};
</script>
