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
      <!-- SearchBar emits 'search' with the user's query -->
      <SearchBar
        placeholder="Search any recipe..."
        @search="goToSearch"
      />
    </section>

    <!-- Surprise Me Button -->
    <section class="text-center mb-16">
      <button
        class="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-400 text-white px-8 py-3 rounded-full transition-all duration-300 text-sm font-medium"
        :disabled="loadingRandom"
        @click="surpriseMe"
      >
        <!-- Dice SVG Icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
        {{ loadingRandom ? 'Finding a recipe...' : 'Surprise Me' }}
      </button>
    </section>

    <!-- Categories Section -->
    <section>
      <h2 class="text-2xl font-bold text-white mb-6">
        Browse by Category
      </h2>

      <!-- Loading State: show placeholders while categories are being fetched -->
      <div v-if="pending" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="n in 8"
          :key="n"
          class="bg-zinc-900 rounded-2xl h-64 animate-pulse border border-zinc-800"
        />
      </div>

      <!-- Error State: show an error message and retry button -->
      <div v-else-if="error" class="text-center py-16">
        <div class="flex justify-center mb-4">
          <!-- Warning Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <p class="text-red-400 text-lg mb-4">
          Failed to load categories. Please try again.
        </p>
        <!-- refresh() comes from useFetch and re-triggers the request -->
        <button
          class="bg-orange-400 text-black px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition-colors"
          @click="refresh()"
        >
          Retry
        </button>
      </div>

      <!-- Categories Grid: render MealCard for each category -->
      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
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
// Page head metadata
useHead({
  title: 'Home — Nuxt Recipe Finder',
  meta: [
    { name: 'description', content: 'Discover and explore thousands of recipes by category' }
  ]
})

// Router instance for navigation
const router = useRouter()

// Loading state for the "Surprise Me" action
const loadingRandom = ref(false)

const { data: categories, pending, error, refresh } = await useFetch('/api/categories')

// Navigate to the search page when the SearchBar emits a query
async function goToSearch(query) {
  if (query) router.push(`/search?q=${query}`)
}

// Fetch a random meal and navigate to its detail page
async function surpriseMe() {
  loadingRandom.value = true
  try {
    // Call the random API endpoint; expect an object with idMeal
    const data = await $fetch('/api/random')
    router.push(`/meal/${data.idMeal}`)
  } catch (e) {
    // Log error; UI already shows disabled state while loading
    console.error(e)
  } finally {
    loadingRandom.value = false
  }
}
</script>