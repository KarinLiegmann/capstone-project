import axios from 'axios'

export async function getRecipeData(activeIngredients, offsetCounter) {

    const ingredientNames = activeIngredients.map(ingredient => ingredient.name)
    const queryString = ingredientNames.join(',+').replaceAll(' ', '%')

    let offsetNumber = offsetCounter

    try {
        const searchResults =
            await axios.get(`http://localhost:4000/recipes`, {
                params: {
                    instructionsRequired: true,
                    ranking: 1,
                    number: 3,
                    offset: offsetNumber,
                    ingredients: queryString
                },
            })

        const recipeData = searchResults.data.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            usedIngredientCount: recipe.usedIngredientCount,
            missedIngredientCount: recipe.missedIngredientCount,
            missedIngredients: recipe.missedIngredients,
            usedIngredients: recipe.usedIngredients,
            unusedIngredients: recipe.unusedIngredients,
            likes: recipe.likes,
            isLiked: false
        }))
        console.log(recipeData)
        return recipeData

    } catch (error) {
        console.error(error.message)
    }
}