<template>
  <div>
    <h1>Todo List</h1>
    <AddTodo />
    <TodoList />
  </div>
</template>

<script setup lang="ts">
import AddTodo from '@/components/AddTodo.vue'
import TodoList from '@/components/TodoList.vue'
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 20px;
}
</style>
