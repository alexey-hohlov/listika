<script setup lang="ts">
import draggable from 'vuedraggable';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';

import {
  Header,
  CreateTaskDialog,
  Button,
  Dialog,
  TaskItem,
} from '@/components';
import { AddIcon } from '@/assets';
import { useTodoStore } from '@/store/todoStore';

const store = useTodoStore();
const { currentList } = storeToRefs(store);

const createTask = ref<boolean>(false);

const isDragging = ref<boolean>(false);
const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    ghostClass: 'ghost',
  };
});

const toggleCreate = () => {
  createTask.value = !createTask.value;
};
</script>

<template>
  <section class="flex flex-col justify-between py-4 px-10 w-full">
    <div class="flex flex-col gap-4 overflow-hidden h-full">
      <Header />
      <draggable
        v-model="currentList.tasks"
        @start="isDragging = true"
        @end="isDragging = false"
        item-key="id"
        class="overflow-y-auto pr-4 mb-2 h-full flex flex-col gap-2"
        v-bind="dragOptions"
        tag="ul"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !isDragging ? 'flip-list' : null,
        }"
      >
        <template #item="{ element }">
          <TaskItem :task="element" />
        </template>
      </draggable>
    </div>
    <div class="relative w-full md:max-w-[500px]" id="dialogs">
      <Button
        v-if="currentList.id !== 'completed'"
        title="Create new task"
        @click="toggleCreate"
        class-name="bg-black text-white rounded-3xl flex items-center h-[50px] gap-1 text-sm px-2 w-full"
      >
        <AddIcon class="size-5" />
      </Button>
      <Dialog
        :is-open="createTask"
        :on-close="toggleCreate"
        bg-color="bg-white"
      >
        <CreateTaskDialog :on-close="toggleCreate" />
      </Dialog>
    </div>
  </section>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.6;
}

.drag {
  cursor: grabbing !important;
}
</style>
