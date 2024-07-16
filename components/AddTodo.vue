<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />
    <span class="addContainer" @click="addTodo">
      <i class="fas fa-plus addBtn"></i>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const newTodo = ref('')
const todoStore = useTodoStore()

const addTodo = async () => {
  if (newTodo.value.trim() !== '') {
    todoStore.addTodo(newTodo.value)
    newTodo.value = ''
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
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
  width: 400px;
  height: 50px;
  text-align: center;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
