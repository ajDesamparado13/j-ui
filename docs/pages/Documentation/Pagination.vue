<template>
<div class="docs-pagination">
  This is pagination
  <ui-pagination v-model="value" :total="50"></ui-pagination>
</div>
</template>

<script>
export default {
  data () {
    return {
      value: 1
    }
  }

}
</script>
