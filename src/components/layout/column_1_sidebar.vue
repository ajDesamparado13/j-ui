<template>
  <div id="main" class="column-1-layout-sidebar">
    <slot name="header">
      <component
        v-if="header.component"
        :is="header.component"
        ref="header"
        v-bind="header"
        class="layout-header"
      ></component>
    </slot>
    <section
      ref="app-content"
      v-bind="content"
      :style="content_style"
      class="layout-body"
    >
      <div class="layout-sidebar">Sidebar</div>
      <div class="section">
        <router-view ref="router-view" v-bind="routerView" class="router-view"></router-view>
      </div>
    </section>
    <slot name="footer">
      <component
        v-if="footer.component"
        :is="footer.component"
        ref="footer"
        class="layout-footer"
        v-bind="footer"
      ></component>
    </slot>
  </div>
</template>

<script>
import layout from "./layout";
export default {
  name: "column-1-sidebar-layout",
  extends: layout
};
</script>

<style lang='scss'>
.column-1-layout-sidebar{
  .layout-body{
    display:flex;
    width:100%;
    height:100%;
    .layout-sidebar{
      max-width:120px;

    }
    div{
      flex-grow:1;
    }

  }
}
.layout-sidebar {
  background: red;
}
</style>
