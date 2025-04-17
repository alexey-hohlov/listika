import { defineStore } from 'pinia';
import { computed, reactive, watch } from 'vue';
import type { IList, ILists, ITask } from '@/types/todoTypes';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { setLocalStorage } from '@/utils/localStorage';

interface IState {
  lists: ILists;
  listIds: string[];
  defaultLists: string[];
  userName: string;
  currentListId: string;
}

export const useTodoStore = defineStore('todo', () => {
  // state
  const state = reactive<IState>({
    lists: {
      home: {
        id: 'home',
        title: 'Home',
        tasks: [],
        icon: 'home',
      },
      completed: {
        id: 'completed',
        title: 'Completed',
        tasks: [],
        icon: 'completed',
      },
    },
    defaultLists: ['home', 'completed'],
    listIds: [],
    userName: 'user',
    currentListId: 'home',
  });

  // getters
  const lists = computed(() => state.lists);
  const listIds = computed(() => state.listIds);
  const defaultLists = computed(() => state.defaultLists);
  const userName = computed(() => state.userName);
  const currentListId = computed(() => state.currentListId);
  const currentList = computed(() => state.lists[state.currentListId]);

  // actions
  const setData = (data: IState) => {
    if (!data) return;

    const { lists, listIds, userName, currentListId } = data;
    state.lists = lists;
    state.listIds = listIds;
    state.userName = userName;
    state.currentListId = currentListId;
  };

  const editUserName = (userName: string) => {
    state.userName = userName;
  };

  const setCurrentListId = (id: string) => {
    state.currentListId = id;
  };

  const addList = (list: IList) => {
    state.lists[list.id] = list;
    state.listIds.push(list.id);
  };

  const deleteList = () => {
    if (!state.lists[currentListId.value]) return;

    const newLists = { ...state.lists };
    delete newLists[currentListId.value];
    state.lists = newLists;
    state.listIds = state.listIds.filter(id => id !== currentListId.value);
    state.currentListId = 'home';
  };

  const editList = (title: string, icon: string) => {
    if (!state.lists[currentListId.value]) return;

    state.lists[currentListId.value].title = title;
    state.lists[currentListId.value].icon = icon;
  };

  const addTask = (task: ITask) => {
    if (!state.lists[currentListId.value]) return;

    state.lists[currentListId.value].tasks.unshift(task);
  };

  const deleteTask = (taskId: string) => {
    if (!state.lists[currentListId.value]) return;

    state.lists[currentListId.value].tasks = state.lists[
      currentListId.value
    ].tasks.filter(task => task.id !== taskId);
  };

  const editTask = (task: ITask) => {
    if (!state.lists[currentListId.value]) return;

    const index = state.lists[currentListId.value].tasks.findIndex(
      item => item.id === task.id
    );

    state.lists[currentListId.value].tasks[index] = {
      title: task.title,
      id: task.id,
      notes: task.notes,
    };
  };

  const checkTask = (task: ITask) => {
    if (!state.lists[currentListId.value]) return;

    state.lists[currentListId.value].tasks = state.lists[
      currentListId.value
    ].tasks.filter(item => item.id !== task.id);

    state.lists['completed'].tasks.unshift(task);
  };

  // watchers
  watch(
    () => state,
    newState => {
      setLocalStorage(LOCAL_STORAGE_KEY, newState);
    },
    { deep: true }
  );

  return {
    state,
    lists,
    listIds,
    defaultLists,
    userName,
    currentListId,
    currentList,
    setData,
    setCurrentListId,
    editUserName,
    addList,
    deleteList,
    editList,
    addTask,
    deleteTask,
    editTask,
    checkTask,
  };
});
