<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="text-center text-zinc-500 text-sm py-6 border-t border-zinc-800">
      © 2026 Nuxt Recipe Finder
    </footer>
  </div>
</template>