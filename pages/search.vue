<template>
  <div>

    <!-- Page Header -->
    <section class="mb-10">
      <h1 class="text-4xl font-bold text-white mb-2">
        Search <span class="text-orange-400">Recipes</span>
      </h1>
      <p class="text-zinc-400">
        Find recipes by name, ingredient, or category
      </p>
    </section>

    <!-- Search Bar -->
    <section class="mb-6">
      <SearchBar
        placeholder="Search any recipe or ingredient..."
        @search="handleSearch"
      />
    </section>

    <!-- Filter Tabs -->
    <section class="mb-8">
      <div class="flex gap-3 flex-wrap">
        <button
          v-for="filter in filters"
          :key="filter.value"
          :class="[
            'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
            activeFilter === filter.value
              ? 'bg-orange-400 text-black border-orange-400'
              : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-orange-400 hover:text-white'
          ]"
          @click="activeFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
    </section>

    <!-- Results Count -->
    <section v-if="searchQuery" class="mb-6">
      <p class="text-zinc-400 text-sm">
        <span v-if="pending">Searching...</span>
        <span v-else-if="results && results.length">
          Found
          <span class="text-orange-400 font-semibold">{{ results.length }}</span>
          recipes for
          <span class="text-white font-semibold">"{{ searchQuery }}"</span>
        </span>
        <span v-else>
          No results found for
          <span class="text-white font-semibold">"{{ searchQuery }}"</span>
        </span>
      </p>
    </section>

    <!-- Loading State -->
    <section v-if="pending">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="n in 8"
          :key="n"
          class="bg-zinc-900 rounded-2xl h-64 animate-pulse border border-zinc-800"
        />
      </div>
    </section>

    <!-- Empty State — No Search Yet -->
    <section
      v-else-if="!searchQuery"
      class="text-center py-24"
    >
      <p class="text-6xl mb-4">🍽️</p>
      <h2 class="text-xl font-semibold text-white mb-2">
        What are you craving?
      </h2>
      <p class="text-zinc-400">
        Type a recipe name, ingredient, or select a filter above
      </p>
    </section>

    <!-- Empty State — No Results -->
    <section
      v-else-if="!pending && (!results || results.length === 0)"
      class="text-center py-24"
    >
      <p class="text-6xl mb-4">😕</p>
      <h2 class="text-xl font-semibold text-white mb-2">
        No recipes found
      </h2>
      <p class="text-zinc-400 mb-6">
        Try searching with a different keyword
      </p>
      <button
        class="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-6 py-3 rounded-full transition-colors"
        @click="clearSearch"
      >
        Clear Search
      </button>
    </section>

    <!-- Results Grid -->
    <section v-else>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MealCard
          v-for="meal in results"
          :key="meal.idMeal"
          :meal="meal"
        />
      </div>
    </section>

  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

useHead({
  title: 'Search Recipes — Nuxt Recipe Finder'
})

const filters = [
  { label: '🔤 By Name', value: 'name' },
  { label: '🥕 By Ingredient', value: 'ingredient' },
  { label: '🍗 By Category', value: 'category' }
]

const activeFilter = ref('name')
const searchQuery = ref(route.query.q || route.query.category || '')

// Build fetch URL based on active filter and search query
const fetchUrl = computed(() => {
  if (!searchQuery.value) return null

  if (activeFilter.value === 'name') {
    return `/api/search?q=${searchQuery.value}`
  }
  if (activeFilter.value === 'ingredient') {
    return `/api/search?ingredient=${searchQuery.value}`
  }
  if (activeFilter.value === 'category') {
    return `/api/search?category=${searchQuery.value}`
  }
  return null
})

const { data: results, pending, refresh } = await useFetch(
  () => fetchUrl.value || '/api/search',
  {
    immediate: !!searchQuery.value,
    watch: [fetchUrl]
  }
)

function handleSearch(query) {
  if (!query.trim()) return
  searchQuery.value = query.trim()
  router.replace({
    path: '/search',
    query: { q: query.trim() }
  })
}

function clearSearch() {
  searchQuery.value = ''
  router.replace({ path: '/search' })
}

// Watch for URL query changes (e.g. coming from home page search)
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.q) {
      searchQuery.value = newQuery.q
      activeFilter.value = 'name'
    }
    if (newQuery.category) {
      searchQuery.value = newQuery.category
      activeFilter.value = 'category'
    }
  }
)
</script>