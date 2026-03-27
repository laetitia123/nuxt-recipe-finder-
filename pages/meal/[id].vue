<template>
  <div>

    <!-- Loading State -->
    <div v-if="pending" class="animate-pulse">
      <div class="h-96 bg-zinc-900 rounded-3xl mb-8" />
      <div class="h-8 bg-zinc-900 rounded-full w-1/2 mb-4" />
      <div class="h-4 bg-zinc-900 rounded-full w-1/4 mb-8" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="h-64 bg-zinc-900 rounded-2xl" />
        <div class="h-64 bg-zinc-900 rounded-2xl" />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-24">
      <p class="text-6xl mb-4">😕</p>
      <h2 class="text-xl font-semibold text-white mb-2">Meal not found</h2>
      <p class="text-zinc-400 mb-6">
        This recipe does not exist or has been removed.
      </p>
      <button
        class="bg-orange-400 hover:bg-orange-500 text-black font-semibold px-6 py-3 rounded-full transition-colors"
        @click="$router.push('/')"
      >
        Back to Home
      </button>
    </div>

    <!-- Meal Content -->
    <div v-else-if="meal">

      <!-- Back Button -->
      <button
        class="flex items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors mb-8 group"
        @click="$router.back()"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span>
        Back
      </button>

      <!-- Hero Section -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

        <!-- Meal Image -->
        <div class="relative rounded-3xl overflow-hidden h-80 lg:h-96">
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

          <!-- Favorite Button -->
          <button
            class="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 border"
            :class="isFavorite
              ? 'bg-orange-400 border-orange-400'
              : 'bg-zinc-900 border-zinc-700 hover:border-orange-400'"
            @click="toggleFavorite"
          >
            <!-- Filled Heart -->
            <svg
              v-if="isFavorite"
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>

            <!-- Outline Heart -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06
                a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
                1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
          </button>
        </div>

        <!-- Meal Info -->
        <div class="flex flex-col justify-center">
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-orange-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
              {{ meal.strCategory }}
            </span>
            <span class="bg-zinc-800 text-zinc-300 text-xs font-semibold px-3 py-1 rounded-full">
              {{ meal.strArea }} Cuisine
            </span>
          </div>

          <h1 class="text-4xl font-bold text-white mb-4">
            {{ meal.strMeal }}
          </h1>

          <p class="text-zinc-400 leading-relaxed line-clamp-4 mb-6">
            {{ meal.strInstructions }}
          </p>

          <!-- Action Buttons -->
          <div class="flex gap-3 flex-wrap">
            
              <a v-if="meal.strYoutube"
              :href="meal.strYoutube"
              target="_blank"
              class="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <!-- Play Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch on YouTube
            </a>

            <button
              class="flex items-center gap-2 border transition-colors font-semibold px-6 py-3 rounded-full"
              :class="isFavorite
                ? 'border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black'
                : 'border-zinc-700 text-zinc-300 hover:border-orange-400 hover:text-orange-400'"
              @click="toggleFavorite"
            >
              <!-- Filled Heart -->
              <svg
                v-if="isFavorite"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>

              <!-- Outline Heart -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06
                  a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
                  1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>

              {{ isFavorite ? 'Saved' : 'Save Recipe' }}
            </button>
          </div>
        </div>
      </section>

      <!-- Ingredients & Instructions -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

        <!-- Ingredients -->
        <div class="md:col-span-1">
          <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
            <h2 class="text-xl font-bold text-white mb-6">
              Ingredients
              <span class="text-orange-400 text-sm font-normal ml-2">
                ({{ meal.ingredients.length }})
              </span>
            </h2>
            <ul class="space-y-3">
              <li
                v-for="(item, index) in meal.ingredients"
                :key="index"
                class="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
              >
                <div class="flex items-center gap-3">
                  <img
                    :src="`https://www.themealdb.com/images/ingredients/${item.name}-Small.png`"
                    :alt="item.name"
                    class="w-8 h-8 object-contain"
                    @error="$event.target.style.display = 'none'"
                  />
                  <span class="text-zinc-300 text-sm capitalize">{{ item.name }}</span>
                </div>
                <span class="text-orange-400 text-sm font-medium">{{ item.measure }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Instructions -->
        <div class="md:col-span-2">
          <h2 class="text-xl font-bold text-white mb-6">
            Instructions
          </h2>
          <div class="space-y-4">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-orange-400 transition-colors"
            >
              <span class="text-orange-400 font-bold text-lg min-w-[2rem]">
                {{ index + 1 }}.
              </span>
              <p class="text-zinc-300 leading-relaxed text-sm">
                {{ step }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- YouTube Video -->
      <section v-if="meal.strYoutube" class="mb-12">
        <h2 class="text-xl font-bold text-white mb-6">
          Watch How To Make It
        </h2>
        <div class="relative rounded-2xl overflow-hidden aspect-video bg-zinc-900 border border-zinc-800">
          <iframe
            :src="`https://www.youtube.com/embed/${youtubeId}`"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

const { data: meal, pending, error } = await useFetch(`/api/meal/${id}`)

useHead(computed(() => ({
  title: meal.value
    ? `${meal.value.strMeal} — Nuxt Recipe Finder`
    : 'Meal Detail — Nuxt Recipe Finder',
  meta: [
    {
      name: 'description',
      content: meal.value?.strInstructions?.slice(0, 150) || 'Recipe details'
    }
  ]
})))

const steps = computed(() => {
  if (!meal.value?.strInstructions) return []
  return meal.value.strInstructions
    .split(/\r\n|\n|\r/)
    .map(s => s.trim())
    .filter(s => s.length > 10)
})

const youtubeId = computed(() => {
  if (!meal.value?.strYoutube) return null
  const url = meal.value.strYoutube
  const match = url.match(/v=([^&]+)/)
  return match ? match[1] : null
})

const favorites = useState('favorites', () => [])

const isFavorite = computed(() =>
  favorites.value.some(f => f.idMeal === meal.value?.idMeal)
)

function toggleFavorite() {
  if (!meal.value) return
  if (isFavorite.value) {
    favorites.value = favorites.value.filter(
      f => f.idMeal !== meal.value.idMeal
    )
  } else {
    favorites.value = [...favorites.value, meal.value]
  }
}
</script>