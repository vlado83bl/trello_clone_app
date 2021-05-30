<template>
  <div 
    class="card-container d-flex align-items-center mb-2"
    :id="id">
    <p>{{ card.name }}</p>
    <i class="fas fa-pen ml-auto" @click="removeCard(card.id)"></i>
  </div>
</template>

<script>
export default {
  props: ['card', 'id'],
  inject: ['removeCard']
};
</script>

<style lang="scss" scoped>
.card-container {
  width: 100%;
  background-color: #fff;
  padding: 0.6rem 0.8rem;
  border-radius: 3px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.123);
}
</style>
