<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';

import { useTodoStore } from '@/store/todoStore';
import { listSchema } from '@/utils/validations';
import { SaveIcon } from '@/assets';
import { Button, Input, IconSelector } from '@/components';

interface Props {
  onClose: () => void;
}
const props = defineProps<Props>();

const store = useTodoStore();
const { currentList } = storeToRefs(store);
const { editList } = store;

const { handleSubmit, resetForm } = useForm({
  validationSchema: listSchema,
  initialValues: {
    listTitle: currentList.value.title,
    icon: currentList.value.icon,
  },
});

const onSubmit = handleSubmit(values => {
  editList(values.listTitle, values.icon);
  resetForm();
  props.onClose();
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-3">
    <h3 class="font-bold text-center">Edit List</h3>
    <Input
      name="listTitle"
      class-name="bg-white h-[50px]"
      placeholder="Enter new list name"
      v-focus
    />
    <IconSelector :default-icon="currentList.icon" />
    <Button
      title="Save"
      class-name="bg-white rounded-2xl h-[50px] flex justify-center gap-1 items-center"
    >
      <SaveIcon class="size-5 fill-black/60" />
    </Button>
  </form>
</template>
