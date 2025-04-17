<script setup lang="ts">
import { Modal, Button } from '@/components';
import { ThinkingIcon } from '@/assets';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  itemName: string;
}
defineProps<Props>();
</script>

<template>
  <Modal :isOpen="isOpen" :onClose="onClose">
    <div class="flex flex-col gap-4">
      <h3
        class="text-2xl font-bold text-center flex justify-center items-center"
      >
        Wait a minute... <ThinkingIcon class="size-7" />
      </h3>
      <div class="text-xl">
        Are you sure you want to
        <span class="text-red-500 font-bold">delete{{ ' ' }}</span>
        <span class="font-bold capitalize">{{ itemName }}</span
        >?
      </div>
      <div class="text-xl text-center">
        This item will be deleted
        <span class="text-red-500 font-bold">immediately</span>!
      </div>
      <div class="flex justify-center gap-4">
        <Button
          title="Delete"
          className="flex-1 bg-red-500 text-white rounded-lg h-[50px]"
          @click="handleDelete"
        />
        <Button
          title="Cancel"
          className="flex-1 bg-gray-100 rounded-lg h-[50px]"
          @click="onClose"
        />
      </div>
    </div>
  </Modal>
</template>
