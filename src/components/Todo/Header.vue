<script setup lang="ts">
import dayjs from 'dayjs';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import { HandIcon, EditIcon, MenuIcon } from '@/assets';
import { Button, Modal, EditUserName, Menu } from '@/components';
import { useTodoStore } from '@/store/todoStore';

const store = useTodoStore();
const { userName } = storeToRefs(store);

const isEditing = ref<boolean>(false);
const showMenu = ref<boolean>(false);

const toggleEditing = () => {
  isEditing.value = !isEditing.value;
};
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const date = dayjs().format('[Today,] ddd D MMMM YYYY');
const greet = ref<string>('');

onMounted(() => {
  const hour = dayjs().hour();
  if (hour >= 5 && hour < 12) {
    greet.value = 'Morning';
  }
  if (hour >= 12 && hour < 17) {
    greet.value = 'Afternoon';
  }
  if (hour >= 17 && hour < 21) {
    greet.value = 'Evening';
  }
  if (hour <= 21 && hour < 5) {
    greet.value = 'Night';
  }
});
</script>

<template>
  <header class="mt-4 flex justify-between items-start pr-4 gap-4">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold">
        Good {{ greet }}, {{ userName }}
        <HandIcon class="size-[30px] inline-block align-middle" />
      </h1>
      <span class="text-gray-600 font-light">{{ date }}</span>
    </div>
    <div class="flex gap-2">
      <Button
        class-name="bg-white rounded-md size-[40px] flex items-center justify-center md:hidden"
        @click="toggleMenu"
      >
        <MenuIcon class="fill-black size-5" />
      </Button>
      <Button
        class-name="bg-white flex items-center p-2 h-[40px] w-[40px] rounded-md lg:w-[150px] md:gap-1"
        @click="toggleEditing"
      >
        <span class="font-light hidden lg:block">Edit username</span>
        <EditIcon class="fill-black size-5" />
      </Button>
    </div>
  </header>
  <Modal :is-open="isEditing" :on-close="toggleEditing">
    <EditUserName :on-close="toggleEditing" />
  </Modal>
  <Menu :is-open="showMenu" :on-close="toggleMenu" />
</template>
