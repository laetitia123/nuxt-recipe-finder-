export default defineEventHandler(async () => {
    const config = useRuntimeConfig()
    const data = await $fetch(`${config.public.mealDbBaseUrl}/categories.php`)
    return data.categories
})
