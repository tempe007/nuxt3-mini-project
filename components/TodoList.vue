<template>
  <div>
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todo'
import TodoItem from '@/components/TodoItem.vue'

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)
</script>

<style scoped>
</style>
