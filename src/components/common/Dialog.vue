<script setup lang="ts">
interface Props {
  isOpen: boolean;
  onClose: () => void;
  bgColor?: string;
}

defineProps<Props>();
</script>

<template>
  <Transition name="appear">
    <div
      v-if="isOpen"
      class="absolute p-2 rounded-2xl w-full bottom-16 shadow-xl"
      :class="bgColor"
      v-click-outside="onClose"
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
