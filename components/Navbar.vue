<template>
  <nav class="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

      <NuxtLink to="/" class="text-orange-400 font-bold text-xl">
        🍽️ RecipeFinder
      </NuxtLink>

      <div class="flex items-center gap-6">
        <NuxtLink
          to="/"
          class="text-zinc-400 hover:text-white transition-colors"
          active-class="text-orange-400"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/search"
          class="text-zinc-400 hover:text-white transition-colors"
          active-class="text-orange-400"
        >
          Search
        </NuxtLink>
        <NuxtLink
          to="/favorites"
          class="text-zinc-400 hover:text-white transition-colors"
          active-class="text-orange-400"
        >
          Favorites
        </NuxtLink>
      </div>

    </div>
  </nav>
</template>