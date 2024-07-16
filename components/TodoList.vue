<template>
  <div>
    <transition-group name="list" tag="ul">
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </transition-group>
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
ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 0;
  text-align: left;
}
/* 리스트 아이템 트랜지션 효과 */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
