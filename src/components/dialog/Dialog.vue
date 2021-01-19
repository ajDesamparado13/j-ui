<template>
<transition :name="animation">
<div class="ui-dialog dialog" :style="{position:position}">
        <div class="dialog-background" @click="cancel('outside')"/>
        <div class="box">
          <div class="animation-content dialog-content">
            <component v-if="component" v-bind="props" v-on="events" :is="component" @close="close"/>
            <div v-else-if="content" v-html="content"/>
            <slot v-bind="props" v-on="events" :is="component" @close="close" v-else/>
          </div>
          <button class="dialog-close" @click="cancel('x')" type="button"></button>
        </div>
    </div>
</transition>
</template>

<script>
const CANCELATION_METHODS = ['escape', 'x', 'outside', 'button']
export default {
  name: 'ui-dialog',
  props: {
    animation: {
      type: String,
      default: 'zoom-out'
    },
    content: {
      type: String,
      default: ''
    },
    component: [Object, Function],
    container: HTMLElement,
    isProgrammatic: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      required: false
    },
    events: {
      type: Object,
      required: false
    },
    canCancel: {
      type: [Array, Boolean],
      default: () => CANCELATION_METHODS
    },
    position: {
      type: String,
      default: 'fixed'
    }
  },
  computed: {
    cancelOptions () {
      if (Array.isArray(this.canCancel)) {
        return this.canCancel
      }
      return this.canCancel ? CANCELATION_METHODS : []
    },
    showX () {
      return this.cancelOptions.indexOf('x') >= 0
    }
  },
  methods: {
    cancel (method) {
      return this.cancelOptions.indexOf(method) < 0 ? null : this.close(method)
    },
    close () {
      this.$emit('close')
      if (this.isProgrammatic) {
        this.$destroy()
        this.removeElement(this.$el)
      }
    },
    removeElement (el) {
      if (typeof el.remove !== 'undefined') {
        el.remove()
      } else {
        el.parentNode.removeChild(el)
      }
    },
    onEscape () {
      if (event.keyCode !== 27) {
        return
      }
      this.cancel('escape')
    },
    mountToBody () {
      document.body.appendChild(this.$el)
    },
    mountToContainer () {
      let container = this.container
      if (container._isVue) {
        this.container = container.$el
      }
      this.previous_style = this.container.style
      if (!this.isProgrammatic) {
        this.container.style = 'position:relative;'
      }
      this.container.insertBefore(this.$el, this.container.firstChild)
    }
  },
  beforeMount () {
    if (!this.container) {
      this.mountToBody()
      return
    }
    let container = this.container
    if (container._isVue) {
      container.$on('hook:mounted', this.mountToContainer)
      return
    }
    if (container instanceof HTMLElement) {
      this.mountToContainer()
      return
    }
    this.mountToBody()
  },
  created () {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.onEscape)
    }
  }
}
</script>

<style lang="scss">
.ui-dialog{
  display:flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 40;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  .box {
      display:block;
      max-height: calc(100vh - 40px);
      overflow:auto;
  }
  .dialog-background{
      background-color:rgba(10, 10, 10, 0.86);
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
  }

  .dialog-content{
      margin: 0 auto;
      position: relative;
  }

  .dialog-close {
      position: absolute;
      top:0px;
      right:0px;
      width:30px;
      height:30px;
  }
}

</style>
