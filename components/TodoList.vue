<template>
  <div>
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/stores/todo';
import { useUserStore } from '@/stores/user';
import TodoItem from '@/components/TodoItem.vue';

const todoStore = useTodoStore();
const userStore = useUserStore();
const { todos } = storeToRefs(todoStore);
const { user } = storeToRefs(userStore);

onMounted(() => {
  todoStore.getTodos(user.value.uid);
});
</script>

<style scoped>
</style>
