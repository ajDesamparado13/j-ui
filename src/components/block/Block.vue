<template>
    <div class="ui-block block" v-bind="{id}">
        <div class="block-background" :class="{ 'is-overlay' :overlay }"> </div>
        <div class="block-content">
            <ui-progress-circular
                :size="48"
                :stroke="5"
                :type="type"
                :progress="progress"
                ></ui-progress-circular>
            <div class="box block-message" v-if="has_process || block_message">
                <span v-if="has_process">{{block_process}}%</span>
                <slot><span v-if="block_message">{{block_message}}</span></slot>
            </div>
        </div>
    </div>
</template>

<script>
import ProgressCircular from '../progress/Circular'
export default {
  name: 'ui-block',
  data () {
    return {
      block_process: '',
      block_message: '',
      previous_style: '',
      width: 0,
      height: 0,
      hiddenElement:null
    }
  },
  computed: {
    has_process () {
      return this.block_process.toString().length > 0
    },
    style () {
      var width = this.width
      var height = this.height
      if (!width || !height) {
        return ''
      }
      return `width:${width}px;height:${height}px`
    }
  },
  props : {
    id: {
      type: String,
      default: 'ui-block'
    },
    type: {
      type: String,
      default: 'indeterminate'
    },
    message: {
      type: String,
      default: ''
    },
    progress: {
      type: [String, Number],
      default:''
    },
    loading: {
      type: Boolean,
      default: false
    },
    container: {
        type:[ HTMLElement,Object ],
        required:false,
        default:null
    },
    hide:{
        type:Boolean,
        default:false,
    },
    overlay:{
        type:Boolean,
        default:true,
    }
  },
  methods: {
    removeElement (el) {
      if (typeof el.remove !== 'undefined') {
        el.remove()
      } else {
        el.parentNode.removeChild(el)
      }
    },
    setVisible(){
        if(this.hide && this.hiddenElement){
            this.hiddenElement.style.visibility = '';
            this.hiddenElement = null
            this.container.firstChild.style.visibility = '';
        }
    },
    setHidden(){
        if(this.hide){
            this.hiddenElement = this.container.firstChild
            this.hiddenElement.style.visibility = 'hidden';
        }
    },
    close () {
      this.setVisible();
      if (this.container) {
        this.container.style = this.previous_style
      }
      this.$destroy()
      this.removeElement(this.$el)
      return null
    },
    setProgress (progress) {
      this.block_process = progress
    },
    setMessage (message) {
      this.block_message = message
    },
    updateStyle () {
      this.width = this.container.clientWidth
      this.height = this.container.clientHeight
    },
    mountToBody () {
      this.$el.style['position'] = 'fixed'
      document.body.appendChild(this.$el)
    },
    mountToContainer () {
      let container = this.container;
      if(container._isVue){
          this.container = container.$el
      }
      this.$el.style['position'] = 'absolute'
      this.previous_style = this.container.style
      this.setHidden();
      this.container.insertBefore(this.$el, this.container.firstChild)
      this.container.style['position'] = 'relative'
      this.updateStyle()
    }
  },
  beforeMount () {
    let container = this.container;
    if(container._isVue){
      container.$on('hook:mounted', this.mountToContainer)
      return
    }
    if(container instanceof HTMLElement){
        this.mountToContainer()
        return;
    }
    this.mountToBody()
  },
  mounted () {
    if (!this.container) {
      this.$el.style['position'] = 'fixed'
    } else {
      this.$el.style['position'] = 'absolute'
    }
  },
  created () {
    this.block_process = this.progress
    this.block_message = this.message
  },
  components: {
    'ui-progress-circular': ProgressCircular
  }
}
</script>

<style lang="scss">
.ui-block{
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: 40;

    .is-overlay{
        background-color: rgba(10, 10, 10, 0.86) ;
    }
    .block-background{
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
    }
    .block-content{
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        justify-content:center;
        margin: 0 20px;
        overflow: hidden;
        position: relative;
        width: 100%;
        .ui-block-message{
            width:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            background:none;
            border:none;
            color:white;
        }
    }
}

</style>
