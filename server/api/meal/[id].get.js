export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const data = await $fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )

    if (!data.meals) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Meal not found'
        })
    }

    const meal = data.meals[0]

    // Extract ingredients and measures cleanly
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (ingredient && ingredient.trim()) {
            ingredients.push({
                name: ingredient.trim(),
                measure: measure ? measure.trim() : ''
            })
        }
    }

    return {
        ...meal,
        ingredients
    }
})