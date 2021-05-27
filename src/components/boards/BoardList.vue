<template>
  <div>
    <h2>Board List</h2>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.emitter.emit('board-list-loaded', true);
    }
  }
</script>

<style lang="scss" scoped>

</style>