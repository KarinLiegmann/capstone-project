import axios from 'axios'
import { saveToLocal } from './localStorage'

export async function getRecipeData(activeIngredients) {

    const ingredientNames = activeIngredients.map(ingredient => ingredient.name)
    let queryString = ingredientNames.join(',+').replaceAll(' ', '%')

    let offsetCounter = 0

    try {
        const searchResults =
            await axios.get(`http://localhost:4000/recipes`, {
                params: {
                    instructionsRequired: true,
                    ranking: 1,
                    number: 3,
                    offset: offsetCounter,
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
        saveToLocal('recipes', recipeData) // auslagern in App.js
        return recipeData

    } catch (error) {
        console.error(error.message)
    }
}