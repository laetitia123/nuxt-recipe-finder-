export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    // Search by name
    if (query.q) {
        const data = await $fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query.q}`
        )
        return data.meals || []
    }
    // Search by category
    if (query.category) {
        const data = await $fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query.category}`
        )
        return data.meals || []
    }
    // Search by ingredient
    if (query.ingredient) {
        const data = await $fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query.ingredient}`
        )
        return data.meals || []
    }

    return []
})