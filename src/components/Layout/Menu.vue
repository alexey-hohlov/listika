<script setup lang="ts">
import { ListManager } from '@/components';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
defineProps<Props>();
</script>

<template>
  <Teleport to="body">
    <Transition name="menu">
      <div
        v-if="isOpen"
        class="z-20 w-screen h-screen fixed top-0 right-0 bg-gray-100/10 backdrop-blur flex items-end justify-center px-2 md:hidden"
        @click="onClose"
      >
        <div
          @click.stop
          class="content bg-white rounded-t-xl w-full p-4 h-[90%] flex flex-col justify-between"
        >
          <ListManager />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-active .content {
  animation: slide 0.3s;
}
.menu-leave-active .content {
  animation: slide 0.3s reverse;
}

@keyframes slide {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
