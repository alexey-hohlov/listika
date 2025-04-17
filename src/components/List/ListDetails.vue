<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { EditIcon, DeleteIcon } from '@/assets';
import { Button, WarningModal } from '@/components';
import { useTodoStore } from '@/store/todoStore';


interface Props {
  toggleEdit: () => void;
}
defineProps<Props>();

const store = useTodoStore();
const { currentListId, currentList } = storeToRefs(store);
const { deleteList } = store;

const deleteModal = ref<boolean>(false);

const toggleDeleting = () => {
  deleteModal.value = !deleteModal.value;
};

const handleDelete = () => {
  deleteList();
  toggleDeleting();
};
</script>

<template>
  <div class="flex justify-between gap-3 items-center pr-6 h-[40px]">
    <h1 class="text-2xl font-bold capitalize truncate">
      {{ currentList.title }}
    </h1>
    <div
      class="flex gap-2"
      v-if="
        currentListId !== 'home' &&
        currentListId !== 'completed' &&
        currentListId !== ''
      "
    >
      <Button class-name="bg-gray-100 rounded-lg" @click="toggleEdit">
        <EditIcon class="fill-gray-500" />
      </Button>
      <Button class-name="bg-gray-100 rounded-lg" @click="toggleDeleting">
        <DeleteIcon class="fill-rose-400" />
      </Button>
    </div>
  </div>
  <WarningModal
    :is-open="deleteModal"
    :on-close="toggleDeleting"
    :handle-delete="handleDelete"
    :item-name="currentList.title"
  />
</template>
