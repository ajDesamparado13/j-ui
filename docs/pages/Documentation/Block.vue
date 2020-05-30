<template>
<div class="docs-block">
  THIS IS BLOCK
  <button @click="blockPage">THIS WILL BLOCK THE WHOLE PAGE FOR 5 SECONDS</button>
</div>

</template>

<script>
export default {
  methods: {
    blockPage () {
      var block = this.$block.show()
      setTimeout(() => {
        block = block.close()
      }, 50000)
    }

  }

}
</script>
