<template>
  <body id="app" class="app-container">
    <router-view class="app-main">
      <layout-header slot="header"></layout-header>
      <layout-footer slot="footer"></layout-footer>
    </router-view>
    <notification-container></notification-container>
  </body>
</template>

<script>
import './scss/app.scss'
import NotificationContainer from '@docs/partials/NotificationContainer'
import Header from '@docs/partials/Header'
import Footer from '@docs/partials/Footer'
export default {
  name: 'app-container',
  components: {
    'notification-container': NotificationContainer,
    'layout-header': Header,
    'layout-footer': Footer
  }
}
</script>
