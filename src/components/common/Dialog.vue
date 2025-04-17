<script setup lang="ts">
interface Props {
  isOpen: boolean;
  onClose: () => void;
  bgColor?: string;
}

defineProps<Props>();
</script>

<template>
  <Teleport to="body" v-if="isOpen">
    <div
      class="fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer"
      @click="onClose"
      v-if="isOpen"
    ></div>
  </Teleport>
  <Transition name="appear">
    <div
      v-if="isOpen"
      class="absolute p-2 rounded-2xl w-full bottom-16 shadow-xl z-40"
      :class="bgColor"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
.appear-enter-active {
  animation: appear 0.3s;
}
.appear-leave-active {
  animation: appear 0.3s reverse;
}
@keyframes appear {
  from {
    scale: 0.8;
    opacity: 0;
  }
  to {
    scale: 1;
    opacity: 1;
  }
}
</style>
