<template>
  <div id="main" class="column-1-layout">
    <slot name="header">
      <component
        v-if="header.component"
        :is="header.component"
        ref="header"
        v-bind="header"
        class="app-header"
      ></component>
    </slot>
    <section
      ref="app-content"
      v-bind="content"
      :style="content_style"
      class="app-content layout-body section container is-fullhd"
    >
      <router-view ref="router-view" v-bind="routerView" class="router-view"></router-view>
    </section>
    <slot name="footer">
      <component
        v-if="footer.component"
        :is="footer.component"
        ref="footer"
        class="app-footer"
        v-bind="footer"
      ></component>
    </slot>
  </div>
</template>

<script>
import layout from './layout'
export default {
  name: "column-1-layout",
  extends:layout,
}
</script>