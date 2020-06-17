<template>
<div class="docs-table">
  <ui-simple-table :data="simple" :columns="columns">

  </ui-simple-table>
</div>
</template>

<script>
export default {
  name: 'docs-table',
  data () {
    return {
      simple: [
        {
          name: ' sample ni',
          family: 'desamparado'
        }
      ],
      columns: [
        {
          name: 'name',
          label: 'Pangalan'
        },
        {
          name: 'family',
          label: 'Pamilya'
        }

      ]

    }
  }

}
</script>

<style>

</style>
