<template>
  <div id="main" class="column-1-layout">
    <component
      v-if="header.component"
      :is="header.component"
      ref="header"
      v-bind="header"
      class="app-header"
    >
      <slot name="header"></slot>
    </component>
    <section
      ref="app-content"
      v-bind="content"
      :style="content_style"
      class="app-content layout-body section container is-fullhd"
    >
      <router-view ref="router-view" v-bind="routerView" class="router-view"></router-view>
    </section>
    <component
      v-if="footer.component"
      :is="footer.component"
      ref="footer"
      class="app-footer"
      v-bind="footer"
    ></component>
  </div>
</template>

<script>
import footer from "./Footer";
import header from "./Header";
export default {
  name: "column-1-layout",
  data() {
    return {
      width: null,
      height: null
    };
  },
  props: {
    dynamicWidth: {
      type: Boolean,
      default: false
    },
    routerView: {
      type: Object,
      default: () => {
        return { class: "router-view container is-fullhd" };
      }
    },
    content: {
      type: Object,
      default: () => {
        return {};
      }
    },
    header: {
      type: Object,
      default: () => {
        return {};
      }
    },
    footer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    content_style() {
      if (this.dynamicWidth && this.width) {
        return `max-width:${this.width}px`;
      }
      return "";
    }
  },
  methods: {
    resizeContent(width = null, height = null) {
      this.$nextTick(() => {
        if (this.$refs["header"]) {
          height = height ? height : this.$refs["header"].$el.clientHeight;
          width = width ? width : this.$refs["header"].$el.clientWidth;
        }
        this.height = height;
        this.width = width;
      });
    }
  },
  mounted() {
    if (this.dynamicWidth) {
      window.addEventListener("resize", this.resizeContent, false);
    }
  },
  beforeDestroy() {
    if (this.dynamicWidth) {
      window.removeEventListener("resize", this.resizeContent);
    }
  },
  components: {
    "layout-footer": footer,
    "layout-header": header
  }
};
</script>

<style lang="scss">
@import '~src/styles/app.scss'
.column-1-layout{
    display:flex;
    flex-wrap:wrap;
    width:100%;
    height:100%;
    @media only screen and (min-width: $bp-hands-wide){
        .app-header{
            max-height:50px;
        }
    }
    @media only screen and (max-width: $bp-hands-wide){
        .app-header{
            flex-wrap:wrap;
        }
    }
    .app-content{
        flex-grow:3;
        padding:1rem 1.5rem;
    }
    .app-footer{
        max-width:100vw;
        max-height:50px;
        flex-grow:1;
    }
    .app-header{
        flex-grow:1;
        padding:0px;
    }
    .app-header,.app-content,.app-footer{
        display:flex;
        padding-left: rem-calc(29px);
        padding-right: rem-calc(29px);
    }
}

</style>