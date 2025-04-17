<script setup lang="ts">
import { useField } from 'vee-validate';

import { icons } from '@/data/listIcons';

const { value } = useField('icon');
</script>

<template>
  <div class="bg-white rounded-2xl p-2 flex flex-col gap-2">
    <h3 class="text-center">Select an icon</h3>
    <div
      class="flex flex-wrap gap-2 justify-start max-h-[200px] min-h-[150px] overflow-y-auto"
    >
      <label
        v-for="item in icons"
        class="relative flex items-center justify-center cursor-pointer select-none size-9 rounded-xl hover:bg-gray-200 has-checked:bg-gray-200"
      >
        <input
          type="radio"
          name="icon"
          v-model="value"
          :value="item.value"
          class="opacity-0 w-0 h-0"
        />
        <component :is="item.icon" class="size-6" />
      </label>
    </div>
  </div>
</template>
