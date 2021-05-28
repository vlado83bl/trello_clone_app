<template>
  <div>
    <div class="boardlist-container d-flex align-items-start p-3 mr-2">
      <the-list v-for="n in openLists" :key="n" @listOpened="openLists += $event"></the-list>
    </div>
  </div>
</template>

<script>
import TheList from "./TheList.vue";
export default {
  mounted() {
    this.emitter.emit("board-list-loaded", true);
  },
  data() {
    return {
      openLists: 1
    }
  },
  components: {
    TheList,
  },
};
</script>

<style lang="scss" scoped>
  .boardlist-container {
    
  }
</style>
