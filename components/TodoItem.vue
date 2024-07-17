<template>
  <li class="shadow">
    <i class="checkBtn fas"
       :class="[priorityClass, { checkBtnCompleted: todo.completed }]"
       @click="toggleTodo(todo)"></i>
    <span v-bind:class="{ textCompleted: todo.completed }">
      {{ todo.text }}
    </span>
    <span v-if="todo.deadline"> (Deadline: {{ formattedDeadline }})</span>
    <span class="removeBtn" @click="removeTodo(todo.id)">
      <i class="fas fa-trash-alt"></i>
    </span>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { useUserStore } from '@/stores/user';
import type { Todo } from "~/types/Todo";

const props = defineProps<{ todo: Todo }>();

const todoStore = useTodoStore();
const userStore = useUserStore();
const formattedDeadline = computed(() => {
  return props.todo.deadline ? new Date(props.todo.deadline).toLocaleDateString() : ''
})
const priorityClass = computed(() => {
  switch (props.todo.priority) {
    case 3:
      return 'fa-battery-quarter'
    case 2:
      return 'fa-battery-half'
    default:
      return 'fa-battery-full'
  }
})

const toggleTodo = (todo: Todo) => {
  todoStore.toggleTodo(todo, userStore.user!.uid);
}

const removeTodo = (id: string) => {
  todoStore.removeTodo(id, userStore.user!.uid)
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
  cursor: pointer;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
  cursor: pointer;
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
.line-through {
  text-decoration: line-through;
}
</style>
