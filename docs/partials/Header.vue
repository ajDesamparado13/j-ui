<template>
  <ui-navbar
    class="layout-header navbar"
    role="navigation"
    aria-label="main navigation"
    v-bind="{brand}"
  >
    <template slot="start"></template>
    <template slot="end">
      <div class="navbar-item">
            <router-link :to="{name:'home'}">Home</router-link>
      </div>
      <div class="navbar-item has-dropdown is-hoverable">
        <router-link :to="{name:'docs:start'}">Docs</router-link>
        <div class="navbar-dropdown is-boxed">
          <router-link :to="{name:'docs:overview'}">Overview</router-link>
          <router-link :to="{name:'docs:modifiers'}">Modifiers</router-link>
          <router-link :to="{name:'docs:columns'}">Columns</router-link>
          <router-link :to="{name:'docs:layout'}">Layout</router-link>
          <router-link :to="{name:'docs:form'}">Form</router-link>
          <router-link :to="{name:'docs:elements'}">Elements</router-link>
          <router-link :to="{name:'docs:breadcrumbs'}">breadcrumbs</router-link>
        </div>
      </div>

      <!-- shown on mobile -->
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="button">
              <span class="icon">
                <i class="fas fa-twitter" aria-hidden="true"></i>
              </span>
              <span>Tweet</span>
            </a>
          </p>
          <p class="control">
            <a class="button is-primary">
              <span class="icon">
                <i class="fas fa-download" aria-hidden="true"></i>
              </span>
              <span>Download</span>
            </a>
          </p>
        </div>
      </div>
    </template>
  </ui-navbar>
</template>

<script>
export default {
  name: 'layout-header',
  data () {
    return {
      // brand: {
      //  href: 'https://github.com/ajDesamparado13/j-ui',
      //  src: '../assets/logo.png',
      //  alt: 'J-UI: Free, open source, and extensible bulma based VUE-JS UI collection'
      // }
    }
  }
}
</script>
