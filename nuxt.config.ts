// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }, 
  runtimeConfig: {
    deepAiKey: process.env.DEEP_AI_KEY,
  }
})
