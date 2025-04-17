<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useTodoStore } from '@/store/todoStore';
import type { IList } from '@/types/todoTypes';
import { icons } from '@/data/listIcons';

interface Props {
  list: IList;
}
defineProps<Props>();

const store = useTodoStore();
const { currentListId } = storeToRefs(store);
const { setCurrentListId } = store;
</script>

<template>
  <li
    class="bg-white flex justify-between w-full items-center cursor-pointer p-2 rounded-lg select-none"
    @click="setCurrentListId(list.id)"
    :class="[list.id === currentListId && '!bg-gray-100']"
  >
    <div class="flex gap-2 items-center min-w-0 flex-1">
      <component class="size-5" :is="icons[list.icon].icon" />
      <span class='truncate block'>{{ list.title }}</span>
    </div>
    <span
      class="bg-gray-100 size-[30px] rounded-full flex justify-center items-center shrink-0"
      :class="[list.id === currentListId && 'bg-white']"
    >
      {{ list.tasks.length }}
    </span>
  </li>
</template>
