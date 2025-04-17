<script setup lang="ts">
interface Props {
  title?: string;
  onClick?: () => void;
  className?: string;
}
defineProps<Props>();
</script>

<template>
  <button
    @click="onClick"
    :class="[
      'button cursor-pointer p-1 select-none font-light',
      className,
    ]"
  >
    <slot></slot>
    {{ title }}
  </button>
</template>

<style scoped lang="scss">
.button {
  &:active {
    scale: 0.99;
    opacity: 0.9;
  }
}
</style>
