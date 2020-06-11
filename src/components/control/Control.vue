<template>
    <div class="control"
        :class="{ 'is-expanded': isExpanded || isFullwidth ,
        'has-icons-left': iconLeft || (icon && iconPosition=='left'),
        'has-icons-right': iconRight || (icon && iconPosition=='right')
        }">
        <ui-icon ref="icon-left" v-if="iconLeft || (icon && iconPosition=='left')"
            class="is-left"
            :icon="icon ? icon : iconLeft"
            ></ui-icon>
            <slot></slot>
            <ui-icon ref="icon-right" v-if="iconRight || (icon && iconPosition=='right')"
                class="is-right"
                :icon="icon ? icon : iconRight"
                @click.native="togglePasswordVisibility"></ui-icon>
    </div>
</template>

<script>
import iconComponent from '../icon/Icon'
export default {
  name: 'ui-control',
  props: {
    isFullwidth: {
      type: Boolean,
      default: false
    },
    isExpanded: {
      type: Boolean,
      default: false
    },
    iconPosition: { type: String, default: 'left' },
    icon: {
      type: [ String, Object ],
      default: ''
    },
    iconLeft: {
      type: [ String, Object ],
      default: ''
    },
    iconRight: {
      type: [ String, Object ],
      default: ''
    }
  },
  mounted () {
    var height = this.$el.clientHeight + 'px'
    if (this.$refs['icon-left']) {
      this.$refs['icon-left'].$el.style.height = height
    }
    if (this.$refs['icon-right']) {
      this.$refs['icon-right'].$el.style.height = height
    }
  },
  components: {
    'ui-icon': iconComponent
  }
}
</script>
