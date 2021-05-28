<template>
  <div>
    <div class="card-container d-flex align-items-center mb-2">
      <p>{{ card.name }}</p>
      <i class="fas fa-pen ml-auto"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['card']
    
  }
</script>

<style lang="scss" scoped>
  .card-container {
    width: 100%;
    background-color: #fff;
    padding: .6rem .8rem;
    border-radius: 3px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.123);
  }
</style>