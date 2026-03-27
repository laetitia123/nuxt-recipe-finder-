<template>
  <div class="relative w-full max-w-2xl mx-auto">
    <input
      v-model="query"
      type="text"
      :placeholder="placeholder"
      class="w-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded-full px-6 py-4 pr-14 focus:outline-none focus:border-orange-400 transition-colors"
      @keyup.enter="emit('search', query)"
    />
    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-400 hover:bg-orange-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center transition-colors text-xl"
      @click="emit('search', query)"
    >
      ⌕
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search recipes...'
  },
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search', 'update:modelValue'])
const query = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  query.value = val
})
</script>