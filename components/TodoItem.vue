<template>
  <li class="shadow">
    <i class="checkBtn fas fa-check"
       :class="{ checkBtnCompleted: todo.completed }"
       @click="toggleTodo(todo.id)"></i>
    <span v-bind:class="{ textCompleted: todo.completed }">
      {{ todo.text }}
    </span>
    <span class="removeBtn" @click="removeTodo(todo.id)">
      <i class="fas fa-trash-alt"></i>
    </span>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useTodoStore } from '@/stores/todo'
import type { Todo } from "~/types/Todo";

const props = defineProps<{ todo: Todo }>()

const todoStore = useTodoStore()

const toggleTodo = (id: string) => {
  todoStore.toggleTodo(id)
}

const removeTodo = (id: string) => {
  todoStore.removeTodo(id)
}
</script>

<style scoped>
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: #FFFFFF;
  border-radius: 5px;
}

.removeBtn {
  margin-left: auto;
  color: #de4343;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
