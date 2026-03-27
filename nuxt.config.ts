export default defineNuxtConfig({
  devtools: { enabled: true },

  pages: true,

  css: ['~/assets/main.css'],

  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      mealDbBaseUrl:process.env.NUXT_MEAL_DB_BASE_URL
    }
  },

  app: {
    head: {
      title: 'Nuxt Recipe Finder',
      meta: [
        { name: 'description', content: 'Discover and save your favorite recipes' }
      ]
    }
  }
})