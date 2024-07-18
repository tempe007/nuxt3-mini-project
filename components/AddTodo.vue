<template>
  <div class="inputBox shadow">
    <select v-model.number="priority">
      <option value="1">Low</option>
      <option value="2">Medium</option>
      <option value="3">High</option>
    </select>
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />
    <input type="date" v-model="deadline" />
    <span class="addContainer" @click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todo';
import { useUserStore } from "~/stores/user";

const newTodo = ref('');
const todoStore = useTodoStore();
const userStore = useUserStore();
const priority = ref(1);
const deadline = ref('');

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    const deadlineDate = deadline.value ? new Date(deadline.value) : null
    todoStore.addTodo(newTodo.value, priority.value,  userStore.user!.uid,deadlineDate);
    newTodo.value = '';
    priority.value = 1;
    deadline.value = '';
  }
}
</script>

<style scoped>
input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.inputBox {
  text-align: center;
  background: #FFFFFF;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}

.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.addBtn {
  color: #FFFFFF;
  vertical-align: middle;
}

.closeModalBtn {
  float: right;
  color: #42b983;
}

input {
  border-style: groove;
  width: 280px;
  height: 50px;
  text-align: center;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

select {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
