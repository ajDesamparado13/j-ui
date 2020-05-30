<template>
	<section id="main" class="column-1-layout">
		<slot name="header">
			<component :is="header.component"
				v-if="header.component"
        v-on="header.events"
				v-bind="header"
				ref="header"
				class="layout-header"
			></component>
		</slot>
		<section
			ref="app-content"
			v-bind="content"
			:style="content_style"
			class="section app-content layout-body"
		>
			<router-view ref="router-view" v-bind="routerView" class="router-view"></router-view>
		</section>
		<slot name="footer">
			<component :is="footer.component"
				v-if="footer.component"
        v-on="footer.events"
				v-bind="footer"
				class="layout-footer"
				ref="footer"
			></component>
		</slot>
	</section>
</template>

<script>
import layout from './layout'
export default {
  name: 'column-1-layout',
  extends: layout
}
</script>

<style lang="scss">
.column-1-layout{
	display:flex;
	flex-wrap:wrap;
	.layout-header{
    align-self:flex-start;
	}
  .layout-footer{
    align-self: flex-end;
  }
  .layout-body{
    flex-grow:4;
    height:100%;
  }
  nav,section,footer{
    flex-grow:1;
    width:100%;
  }
}
</style>
