export default defineEventHandler(async () => {
    const data = await $fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
    )
    return data.meals[0]
})