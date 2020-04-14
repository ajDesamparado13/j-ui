<template>
  <footer class="layout-footer footer">
    <div class="footer-container">
          <div class="footer-about">
                <p> Maintained by Allen Jay Desamparado.</p>
                <ul>
                  <li><ui-button>Github</ui-button></li>
                </ul>
          </div>
          <div class="footer-sidebar">
            <ul>
            <li> <ui-button @click="$router.push({name:'home'})"> Home </ui-button> </li>
            <li> <ui-button @click="$router.push({name:'docs:start'})"> Documentation </ui-button> </li>
            </ul>
          </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'layout-footer'

}
</script>

<style lang="scss">
.layout-footer{
  background: #ffffff;
    .footer-container{
      margin:0 auto;
      display:flex;
      align-items: center;
      justify-content: space-between;
      max-width:1200px;
        .footer-sidebar,.footer-about{
            text-align: left;
        }
        .footer-sidebar{
            ul{
              li{
                &:not(:last-child){
                  margin-bottom: 10px;
                }
              }

            }
        }
    }
}
</style>
