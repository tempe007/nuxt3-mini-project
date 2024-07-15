// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '@/assets/styles/main.css'
  ],
  typescript: {
    strict: true
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }
})
