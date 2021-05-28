import axios from 'axios'

export async function fetchAutofillSuggestions(searchQuery) {
    const value = searchQuery

    try {
        const searchResults =
            await axios.get('/ingredients', {
                params: {
                    metaInformation: true,
                    number: 5,
                    query: value
                },
            })

        const ingredientsData = searchResults.data.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name
        }))

        return ingredientsData

    } catch (error) {
        console.error(error.message)
    }
}

export async function getRecipeData(activeIngredients, offsetCounter) {

    const ingredientNames = activeIngredients.map(ingredient => ingredient.name)
    const queryString = ingredientNames.join(',+').replaceAll(' ', '%')

    let offsetNumber = offsetCounter

    try {
        const searchResults =
            await axios.get(`/recipes`, {
                params: {
                    instructionsRequired: true,
                    ranking: 1,
                    number: 6,
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
            isLiked: false,
            isFavourite: false
        }))

        return recipeData

    } catch (error) {
        console.error(error.message)
    }
}

export async function getInstructions(recipeToRender) {
    let recipeId = recipeToRender.id

    try {
        const searchResults =
            await axios.get(`/recipeInstructions/${recipeId}`)

        const recipeInstructions = searchResults.data.map(result => (result.steps.map(step => step.step)
        ))

        const wholeRecipe = {
            ...recipeToRender, steps: [...recipeInstructions]
        }
        return wholeRecipe

    } catch (error) {
        console.error(error.message)
    }

}