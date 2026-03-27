<template>
  <div
    class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-400 transition-all duration-300 cursor-pointer group"
    @click="$router.push(`/meal/${meal.idMeal}`)"
  >
    <div class="relative overflow-hidden h-48">
      <img
        :src="meal.strMealThumb || meal.strCategoryThumb"
        :alt="meal.strMeal || meal.strCategory"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
    </div>

    <div class="p-4">
      <h3 class="text-white font-semibold text-lg truncate">
        {{ meal.strMeal || meal.strCategory }}
      </h3>
      <p class="text-zinc-400 text-sm mt-1 line-clamp-2">
        {{ meal.strDescription || meal.strCategoryDescription || 'Explore delicious recipes' }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  meal: {
    type: Object,
    required: true
  }
})
</script>