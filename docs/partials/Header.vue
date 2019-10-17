<template>
  <ui-navbar
    class="layout-header navbar"
    role="navigation"
    aria-label="main navigation"
    v-bind="{brand}"
  >
    <template slot="start">
      <a class="navbar-item" href="https://bulma.io/">Home</a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">Docs</a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">Overview</a>
          <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">Modifiers</a>
          <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">Columns</a>
          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">Layout</a>
          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">Form</a>
          <hr class="navbar-divider" />
          <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">Elements</a>
          <a
            class="navbar-item is-active"
            href="https://bulma.io/documentation/components/breadcrumb/"
          >Components</a>
        </div>
      </div>
    </template>
    <template slot="end">
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
  name: "layout-header",
  data() {
    return {
      brand: {
        href: "https://github.com/ajDesamparado13/j-ui",
        src: "./assets/logo.png",
        alt: "Bulma: Free, open source, & modern CSS framework based on Flexbox"
      }
    };
  }
};
</script>
