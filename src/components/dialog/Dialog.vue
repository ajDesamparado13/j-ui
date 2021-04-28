<template>
<transition :name="animation">
    <div class="ui-dialog dialog" :style="{position:position}">
        <div class="dialog-background" @click="cancel('outside')"></div>
        <div class="box">
          <div class="animation-content">
            <component class="dialog-content" v-if="component" v-bind="props" v-on="events" :is="component" @close="close"/>
            <div class="dialog-content" v-else v-bind="props">
                <div  v-if="content" v-html="content"> </div>
                <div class="buttons">
                    <button class="ui-button button" v-for="(btn,index) in buttons" :key="index" v-on="getEvents(btn)" v-bind="getProps(btn)" >{{ getText(btn) }}</button>
                </div>
            </div>
          </div>
          <button class="dialog-close" @click="cancel('x')" type="button"></button>
        </div>
    </div>
</transition>
</template>

<script>

import BaseModal from '../BaseModal'
export default {
  name: 'ui-dialog',
  extends: BaseModal,
  props: {
    buttons: {
      type: Array,
      required: false
    }
  },
  methods: {
    getText (btn) {
      return this.$_Arr.getProperty(btn, 'text', '')
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
