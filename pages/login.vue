<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <NuxtLink to="/register">Register</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  await userStore.login(email.value, password.value)
  if (userStore.isAuthenticated) {
    router.push('/')
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}
button:hover {
  background-color: #0056b3;
}
</style>
