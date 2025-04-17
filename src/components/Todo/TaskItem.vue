<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import type { ITask } from '@/types/todoTypes';
import {
  Button,
  WarningModal,
  Dialog,
  EditTaskDialog,
  ShowTask,
  CheckButton,
} from '@/components';
import { DeleteIcon, EditIcon, ShowIcon } from '@/assets';
import { useTodoStore } from '@/store/todoStore';

interface Props {
  task: ITask;
}
const props = defineProps<Props>();

const store = useTodoStore();
const { currentListId } = storeToRefs(store);
const { deleteTask, checkTask } = store;

const deleteModal = ref<boolean>(false);
const editTask = ref<boolean>(false);
const showTask = ref<boolean>(false);

const toggleDeleting = () => {
  deleteModal.value = !deleteModal.value;
};
const toggleEdit = () => {
  editTask.value = !editTask.value;
};

const toggleShow = () => {
  showTask.value = !showTask.value;
};

const handleDelete = () => {
  deleteTask(props.task.id);
  toggleDeleting();
};

const handleCheck = () => {
  checkTask(props.task);
};
</script>

<template>
  <li
    class="bg-white h-[50px] rounded-md p-2 flex items-center justify-between w-full select-none cursor-grab"
  >
    <div class="flex gap-2 items-center">
      <CheckButton
        :on-check="handleCheck"
        v-if="currentListId !== 'completed'"
      />
      <span class="font-medium line-clamp-1">{{ task.title }}</span>
    </div>
    <div class="flex gap-2">
      <Button class-name="bg-gray-200/70 rounded-md" @click="toggleShow">
        <ShowIcon class="fill-gray-500" />
      </Button>
      <Button
        class-name="bg-gray-200/70 rounded-md"
        @click="toggleEdit"
        v-if="currentListId !== 'completed'"
      >
        <EditIcon class="fill-gray-500" />
      </Button>
      <Button class-name="bg-gray-200/70 rounded-md" @click="toggleDeleting">
        <DeleteIcon class="fill-rose-400" />
      </Button>
    </div>
    <WarningModal
      :is-open="deleteModal"
      :on-close="toggleDeleting"
      :handleDelete="handleDelete"
      :item-name="task.title"
    />
    <ShowTask :is-open="showTask" :on-close="toggleShow" :task="task" />
    <Teleport to="#dialogs">
      <Dialog :is-open="editTask" :on-close="toggleEdit" bg-color="bg-white">
        <EditTaskDialog :on-close="toggleEdit" :task="task" />
      </Dialog>
    </Teleport>
  </li>
</template>
