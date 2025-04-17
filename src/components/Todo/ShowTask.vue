<script setup lang="ts">
import { CancelIcon, NeutralIcon } from '@/assets';
import { Modal, Button } from '@/components';
import type { ITask } from '@/types/todoTypes';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  task: ITask;
}
defineProps<Props>();
</script>

<template>
  <Modal :is-open="isOpen" :on-close="onClose">
    <div class="flex flex-col gap-4 overflow-hidden">
      <h3 class="text-center font-bold capitalize line-clamp-2">
        {{ task.title }}
      </h3>
      <p class="overflow-y-auto mr-2 max-h-[400px]" v-if="task.notes">{{ task.notes }}</p>
      <span class="flex justify-center items-center gap-1 font-light" v-else
        >no notes here <NeutralIcon class="size-7"
      /></span>
      <Button
        title="Close"
        class-name="h-[50px] p-4 bg-gray-100 rounded-2xl flex items-center justify-center gap-1"
        @click="onClose"
      >
        <CancelIcon class="size-5 fill-black/60" />
      </Button>
    </div>
  </Modal>
</template>
