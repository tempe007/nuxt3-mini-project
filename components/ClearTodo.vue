<template>
  <div class="clearAllContainer">
    <span v-if="!todoStore.isEmptyTodos" class="clearAllBtn" @click="clearTodo">Clear All</span>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { useUserStore } from '@/stores/user';

const todoStore = useTodoStore();
const userStore = useUserStore();

const clearTodo = () => {
  todoStore.clearTodo(userStore.user.uid);
}
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: #FFFFFF;
  border-radius: 5px;
  margin: 10px auto;
}

.clearAllBtn {
  color: #e20303;
  display: block;
  cursor: pointer;
}
</style>