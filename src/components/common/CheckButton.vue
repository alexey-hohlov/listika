<script setup lang="ts">
interface Props {
  onCheck: () => void;
}
defineProps<Props>();
</script>

<template>
  <label
    class="container relative flex items-center justify-center cursor-pointer select-none rounded-lg border-2 border-gray-700 hover:bg-gray-100"
  >
    <input type="radio" class="opacity-0 w-0 h-0" @change="onCheck" />
    <div class="checkmark"></div>
  </label>
</template>

<style scoped>
.container {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
}

.checkmark {
  width: 10px;
  height: 10px;
  background: rgb(54, 64, 83);
  border-radius: 3px;
  display: none;
}

.container input:checked ~ .checkmark {
  display: block;
}
</style>
