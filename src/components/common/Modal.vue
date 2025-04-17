<script setup lang="ts">
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
defineProps<Props>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        @click="onClose"
        class="p-2 z-20 w-screen h-screen fixed top-0 left-0 bg-gray-100/10 backdrop-blur cursor-pointer flex items-center justify-center"
      >
        <div
          @click.stop
          class="content cursor-default rounded-xl shadow-xl p-4 bg-white max-h-[90%] max-w-[500px] min-w-[300px]"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .content {
  animation: scale 0.3s;
}
.modal-leave-active .content {
  animation: scale 0.3s reverse;
}

@keyframes scale {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
