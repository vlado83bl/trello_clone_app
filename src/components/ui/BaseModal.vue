<template>
<div class="modal-background" @click="$emit('close')"></div>
  <div class="modal-container">
    <div class="modalheader d-flex align-items-center justify-content-center">
      <slot name="header"></slot>
      <i class="fas fa-times ml-auto pr-3" @click="$emit('close')"></i>
    </div>
    <hr style="width:90%; text-align:center;">
    <div class="modal-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    emits: ['close']
  }
</script>

<style lang="scss" scoped>
.modal-background {
  position: fixed;
  top: 4rem;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 10;
}

.modal-container {
  position: fixed;
  top: 4.3rem;
  z-index: 100;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  overflow: hidden;
  max-width: 40rem;
  background-color: #fff;
}

.modalheader {
  padding: .8rem;
  font-size: 1.4rem;
  line-height: 4rem;
  text-align: center;
  white-space: nowrap;

  & i {
    color: #687b9c;
    cursor: pointer;
  }

  & hr {
    width:70%;
    text-align: center;
  }
}
</style>