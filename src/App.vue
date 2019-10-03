<template>
  <div id="app" class="app-container">
    <router-view class="app-main">
      <layout-header slot="header"></layout-header>
      <layout-footer slot="footer"></layout-footer>
    </router-view>
    <notification-container></notification-container>
  </div>
</template>

<script>
import NotificationContainer from '@/partials/NotificationContainer'
import Header from '@/partials/Header'
import Footer from '@/partials/Footer'
export default {
  name: 'app-container',
  components: {
    'notification-container': NotificationContainer,
    'layout-header': Header,
    'layout-footer': Footer
  }
}
</script>

<style lang="scss">
*, *::before, *::after { box-sizing: border-box; }

html,body{
    -webkit-overflow-scrolling : touch !important;
}
html {
    width:100%;
    min-height:100%;
    overflow-y:auto !important;
}
body{
    zoom:100%;
}

body,.app-main,.app-container{
    width:100%;
    min-height:100vh;
    height:100% !important;
}

[v-cloak] { display: none; }

.app-container{

}

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
