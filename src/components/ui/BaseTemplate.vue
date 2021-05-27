<template>
  <div
    class="template d-flex flex-column p-3 mr-4"
    :style="{ backgroundImage: backgroundImage }"
  >
    <div class="template-box mb-3" v-if="isTemplate">
      <slot name="template">TEMPLATE</slot>
    </div>
    <div class="template-title">
      <slot name="title" class="template-title"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['backgroundImage', 'isTemplate'],
};
</script>

<style lang="scss" scoped>
.template {
  border-radius: 5px;
  background-position: center;
  background-size: cover;
  max-width: 20rem;
  min-width: 20rem;
  height: 9.6rem;
  cursor: pointer;
  filter: brightness(100%);

  &:hover {
    filter: brightness(80%);
  }

  &-box {
    background-color: rgba(255, 255, 255, 0.69);
    border-radius: 3px;
    padding: 0.3rem 0.8rem;
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.6rem;
    align-items: center;
    color: #172b4d;
    width: fit-content;
  }

  &-title {
    font-size: 1.6rem;
    font-weight: 700;
    word-wrap: break-word;
    line-height: 2rem;
    color: #fff;
  }
}
</style>
