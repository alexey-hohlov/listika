<script setup lang="ts">
import { useForm } from 'vee-validate';

import { Button, Input, TextArea } from '@/components';
import { SaveIcon, CancelIcon } from '@/assets';
import { useTodoStore } from '@/store/todoStore';
import { taskSchema } from '@/utils/validations';
import type { ITask } from '@/types/todoTypes';

interface Props {
  onClose: () => void;
  task: ITask;
}
const props = defineProps<Props>();

const store = useTodoStore();
const { editTask } = store;

const { handleSubmit, resetForm } = useForm({
  validationSchema: taskSchema,
  initialValues: {
    taskTitle: props.task.title,
    taskNotes: props.task.notes,
  },
});

const onSubmit = handleSubmit(values => {
  editTask({
    title: values.taskTitle,
    id: props.task.id,
    notes: values.taskNotes,
  });
  resetForm();
  props.onClose();
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-3">
    <h3 class="text-center font-bold">Edit Task</h3>
    <Input
      name="taskTitle"
      class-name="bg-gray-100 h-[50px]"
      placeholder="Enter new task name"
      v-focus
    />
    <TextArea
      name="taskNotes"
      class-name="bg-gray-100"
      placeholder="Add notes"
      :rows="10"
    />
    <div class="flex gap-3">
      <Button
        title="Save"
        class-name="h-[50px] flex-1 bg-black rounded-2xl text-white flex items-center justify-center gap-1"
      >
        <SaveIcon class="size-5" />
      </Button>
      <Button
        title="Cancel"
        class-name="h-[50px] flex-1 bg-gray-100 rounded-2xl flex items-center justify-center gap-1"
        @click="onClose"
      >
        <CancelIcon class="size-5 fill-black/60" />
      </Button>
    </div>
  </form>
</template>
