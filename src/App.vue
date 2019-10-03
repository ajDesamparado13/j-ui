<template>
  <div id="app" class="app-container">
    <router-view class="app-main"></router-view>
    <notification-container></notification-container>
  </div>
</template>

<script>
import NotificationContainer from '@/partials/NotificationContainer'
export default {
  name: 'app-container',
  components: {
    'notification-container': NotificationContainer
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:$primary;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
