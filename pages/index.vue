<template>
  <div>

    <!-- Hero Section -->
    <section class="text-center py-16 px-4">
      <h1 class="text-5xl font-bold text-white mb-4">
        Discover <span class="text-orange-400">Delicious</span> Recipes
      </h1>
      <p class="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
        Search thousands of recipes, explore categories, and save your favorites.
      </p>
      <SearchBar
        placeholder="Search any recipe..."
        @search="goToSearch"
      />
    </section>

    <!-- Surprise Me Button -->
    <section class="text-center mb-16">
      <button
        class="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-400 text-white px-8 py-3 rounded-full transition-all duration-300 text-sm font-medium"
        :disabled="loadingRandom"
        @click="surpriseMe"
      >
        {{ loadingRandom ? '🎲 Finding a recipe...' : '🎲 Surprise Me' }}
      </button>
    </section>

    <!-- Categories Section -->
    <section>
      <h2 class="text-2xl font-bold text-white mb-6">
        Browse by Category
      </h2>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="n in 8"
          :key="n"
          class="bg-zinc-900 rounded-2xl h-64 animate-pulse border border-zinc-800"
        />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <p class="text-red-400 text-lg">Failed to load categories. Please try again.</p>
        <button
          class="mt-4 bg-orange-400 text-black px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition-colors"
          @click="refresh()"
        >
          Retry
        </button>
      </div>

      <!-- Categories Grid -->
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
      {{ categories }}
        <MealCard
          v-for="category in categories"
          :key="category.idCategory"
          :meal="category"
          @click="$router.push(`/search?category=${category.strCategory}`)"
        />
      </div>
    </section>

  </div>
</template>

<script setup>
useHead({
  title: 'Home — Nuxt Recipe Finder',
  meta: [
    { name: 'description', content: 'Discover and explore thousands of recipes by category' }
  ]
})

const router = useRouter()
const loadingRandom = ref(false)

const { data: categories, pending, error, refresh } = await useFetch('/api/categories')

async function goToSearch(query) {
  if (query) router.push(`/search?q=${query}`)
}

async function surpriseMe() {
  loadingRandom.value = true
  try {
    const data = await $fetch('/api/random')
    router.push(`/meal/${data.idMeal}`)
  } catch (e) {
    console.error(e)
  } finally {
    loadingRandom.value = false
  }
}
</script>