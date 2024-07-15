<template>
  <div class="todo-item">
    <input type="checkbox" v-model="todo.completed" @change="toggleTodo(todo.id)" />
    <span :class="{ 'line-through': todo.completed }">{{ todo.text }}</span>
    <button @click="removeTodo(todo.id)">Remove</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Todo } from '@/stores/todo'
import { useTodoStore } from '@/stores/todo'

const props = defineProps<{ todo: Todo }>()

const todoStore = useTodoStore()

const toggleTodo = (id: number) => {
  todoStore.toggleTodo(id)
}

const removeTodo = (id: number) => {
  todoStore.removeTodo(id)
}
</script>

<style scoped>
.todo-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.line-through {
  text-decoration: line-through;
}
</style>
