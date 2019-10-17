<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h2 class="title is-4"><b>Extensible</b> UI Components for<b> Vue.js</b> based on <b>Bulma</b></h2>
    <pre> $ npm install aj-vue-ui </pre>
    <ui-button>Get started</ui-button>
    <p>v0.1.0 - alpha</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  img {
    object-fit: contain;
  }
  b{
    color:white;
  }
}
</style>
