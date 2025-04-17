<script setup lang="ts">
import { useForm } from 'vee-validate';

import { SaveIcon } from '@/assets';
import { Button, Input, IconSelector } from '@/components';
import { useTodoStore } from '@/store/todoStore';
import { generateId } from '@/utils/generateId';
import { listSchema } from '@/utils/validations';

interface Props {
  onClose: () => void;
}
const props = defineProps<Props>();

const store = useTodoStore();
const { addList } = store;

const { handleSubmit, resetForm } = useForm({
  validationSchema: listSchema,
  initialValues: {
    listTitle: '',
    icon: 'blue',
  },
});

const onSubmit = handleSubmit(values => {
  addList({
    title: values.listTitle,
    id: generateId(),
    tasks: [],
    icon: values.icon,
  });
  resetForm();
  props.onClose();
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-3">
    <h3 class="text-center">New List</h3>
    <Input
      name="listTitle"
      class-name="bg-white h-[50px]"
      placeholder="Enter list name"
      v-focus
    />
    <IconSelector />
    <Button
      title="Save"
      class-name="bg-white rounded-2xl h-[50px] flex justify-center gap-1 items-center"
    >
      <SaveIcon class="size-5 fill-black/60" />
    </Button>
  </form>
</template>
