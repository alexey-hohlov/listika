<script setup lang="ts">
import { useForm } from 'vee-validate';

import { Button, Input, TextArea } from '@/components';
import { SaveIcon, CancelIcon } from '@/assets';
import { useTodoStore } from '@/store/todoStore';
import { taskSchema } from '@/utils/validations';
import { generateId } from '@/utils/generateId';

interface Props {
  onClose: () => void;
}
const props = defineProps<Props>();

const store = useTodoStore();
const { addTask } = store;

const { handleSubmit, resetForm } = useForm({
  validationSchema: taskSchema,
});

const onSubmit = handleSubmit(values => {
  addTask({
    title: values.taskTitle,
    id: generateId(),
    notes: values.taskNotes,
  });
  resetForm();
  props.onClose();
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-3">
    <Input
      name="taskTitle"
      className="bg-gray-100 h-[50px]"
      placeholder="Enter task name"
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
