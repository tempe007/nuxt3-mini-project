<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink v-if="!isAuthenticated" to="/login">Login</NuxtLink>
        <NuxtLink v-if="!isAuthenticated" to="/register">Register</NuxtLink>
        <button v-if="isAuthenticated" @click="logout">Logout</button>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <p>© 2024 mini project (올리버,루이스)</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)

const logout = () => {
  userStore.logout()
}
</script>

<style scoped>
header {
  background-color: #008cff;
  color: white;
  padding: 10px 0;
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px;
}

nav a {
  color: white;
  text-decoration: none;
}

button {
  padding: 5px 10px;
  background-color: #868181;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #e60000;
}

main {
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

footer {
  background-color: #d000ff;
  color: white;
  padding: 10px 0;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
