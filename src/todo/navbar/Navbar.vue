<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <slot name="brand">
      <router-link v-if="brand" class="navbar-item" :to="brand.href">
          <img :src="brand.src" :alt="brand.alt" />
      </router-link>
      </slot>
      <a
        v-if="hasBurger"
        @click.capture="show=!show"
        role="button"
        class="navbar-burger"
        :class="{'is-active':show}"
        aria-label="menu"
        aria-expanded="false"
      > <span aria-hidden="true" v-for="n in 3"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{'is-active':show}">
      <div class="navbar-start">
        <slot name="start"></slot>
      </div>
      <div class="navbar-end">
        <slot name="end"> </slot>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ui-navbar',
  data () {
    return {
      show: false
    }
  },
  props: {
    brand: {
      type: Object,
      required: false
    },
    hasBurger: {
      type: Boolean,
      default: true
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.navbar{
  .navbar-burger{
    &.is-active{
      span:nth-child(1){
        transform:translateY(5px) rotate(45deg)
      }
      span:nth-child(2){
        opacity:0;
      }
      span:nth-child(3){
      transform: translateY(-5px) rotate(-45deg);
      }
    }
  }
}
</style>
