<template>
  <div class="badge d-flex align-items-center justify-content-center mr-2">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  color: #ffffff;
  padding: 0.8rem 0.8rem;
  background-color: rgba(255, 255, 255, 0.3);
  color: #292929;
  border-radius: 5%;
  font-size: 1.6rem;
  max-height: 3.2rem;

  &:hover {
    cursor: pointer;
  }
}
</style>
