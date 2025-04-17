<script setup lang="ts">
import { onMounted } from 'vue';

import { Sidebar, TodoList } from '@/components';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { useTodoStore } from '@/store/todoStore';
import { getLocalStorage } from '@/utils/localStorage';

const store = useTodoStore();

onMounted(() => {
  store.setData(getLocalStorage(LOCAL_STORAGE_KEY));
});
</script>

<template>
  <main class="flex h-screen bg-gray-100 p-2">
    <Sidebar />
    <TodoList />
  </main>
</template>
