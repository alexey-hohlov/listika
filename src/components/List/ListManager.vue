<script setup lang="ts">
import draggable from 'vuedraggable';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { useTodoStore } from '@/store/todoStore';
import {
  ListItem,
  Button,
  Dialog,
  CreateListDialog,
  EditListDialog,
  ListDetails,
} from '@/components';
import { AddIcon } from '@/assets';

const store = useTodoStore();
const { lists, state, defaultLists } = storeToRefs(store);

const createList = ref<boolean>(false);
const editList = ref<boolean>(false);
const isDragging = ref<boolean>(false);

const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    ghostClass: 'ghost',
  };
});

const toggleCreate = () => {
  createList.value = !createList.value;
};
const toggleEdit = () => {
  editList.value = !editList.value;
};
</script>

<template>
  <div class="flex flex-col gap-3 overflow-hidden h-full">
    <ListDetails :toggle-edit="toggleEdit" />
    <ul class="flex flex-col gap-2 pr-4">
      <ListItem v-for="id in defaultLists" :list="lists[id]" />
    </ul>
    <draggable
      v-model="state.listIds"
      :item-key="(id: string) => id"
      @start="isDragging = true"
      @end="isDragging = false"
      class="overflow-y-auto pr-4 mb-2 flex flex-col gap-2"
      v-bind="dragOptions"
      tag="ul"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !isDragging ? 'flip-list' : null,
      }"
    >
      <template #item="{ element }">
        <ListItem :list="lists[element]" />
      </template>
    </draggable>
  </div>
  <div class="relative">
    <Button
      @click="toggleCreate"
      title="Create new list"
      class-name="bg-gray-100 rounded-3xl flex items-center h-[50px] gap-1 text-sm px-2 w-full"
    >
      <AddIcon class="size-5 fill-black/70" />
    </Button>
    <Dialog
      :is-open="createList"
      :on-close="toggleCreate"
      bg-color="bg-gray-100"
    >
      <CreateListDialog :on-close="toggleCreate" />
    </Dialog>
    <Dialog :is-open="editList" :on-close="toggleEdit" bg-color="bg-gray-100">
      <EditListDialog :on-close="toggleEdit" />
    </Dialog>
  </div>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.7;
  background: oklch(96.7% 0.003 264.542);
}
</style>
