<template>
    <transition :name="animation">
        <div v-if="isActive" class="ui-modal modal is-active">
            <div class="modal-background" @click="cancel('outside')"></div>
            <div class="animation-content box position-relative" ref="content" :class="{ 'modal-content': !hasModalCard }" >
                <component v-if="component" v-bind="props" v-on="events" :is="component" @close="close"/>
                <div v-else-if="content" v-html="content"/>
                <slot v-else/>
              <button v-if="showX" class="modal-close" @click="cancel('x')" type="button"></button>
            </div>
        </div>
    </transition>
</template>

<script>
import BaseModal from '../BaseModal'
export default {
  name: 'ui-modal',
  extends: BaseModal,
  props: {
    hasModalCard: Boolean,
    scroll: {
      type: String,
      default: () => {
        return 'clip'
      },
      validator: (value) => {
        return [
          'clip',
          'keep'
        ].indexOf(value) >= 0
      }
    }
  },
  data () {
    return {
      savedScrollTop: null
    }
  }
}
</script>
