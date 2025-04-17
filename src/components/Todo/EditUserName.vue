<script setup lang="ts">
import { useForm } from 'vee-validate';

import { Input, Button } from '@/components';
import { SaveIcon, CancelIcon, SmileIcon } from '@/assets';
import { userNameSchema } from '@/utils/validations';
import { useTodoStore } from '@/store/todoStore';

interface Props {
  onClose: () => void;
}
const props = defineProps<Props>();

const store = useTodoStore();
const { editUserName } = store;

const { handleSubmit, resetForm } = useForm({
  validationSchema: userNameSchema,
});

const onSubmit = handleSubmit(values => {
  editUserName(values.userName);
  resetForm();
  props.onClose();
});

const handleCancel = () => {
  resetForm();
  props.onClose();
};
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <div class="flex items-center gap-1">
      <h3 class="select-none text-2xl text-center font-bold">
        Hi there! What's your name?
      </h3>
      <SmileIcon class="size-7" />
    </div>
    <Input
      name="userName"
      class-name="bg-gray-100 h-[50px]"
      placeholder="Your name is..."
      v-focus
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
        @click="handleCancel"
      >
        <CancelIcon class="size-5 fill-black/60" />
      </Button>
    </div>
  </form>
</template>
