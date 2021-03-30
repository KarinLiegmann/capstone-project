import axios from 'axios'
import { saveToLocal } from '../library/localStorage'
import { useEffect, useState } from 'react'

export async function GetRecipeData(activeIngredients) {

    const [data, setData] = useState([])

    /* const ingredientNames = activeIngredients.map(ingredient => ingredient.name)
     let queryString = ingredientNames.join(',+').replaceAll(' ', '%')
 
     let offsetCounter = 0 */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchResults =
                    await axios.get(`http://localhost:4000/recipes`, {
                        params: {
                            instructionsRequired: true,
                            ranking: 1,
                            number: 3,
                            offset: 0,
                            ingredients: 'banana'
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
                setData(recipeData)
                saveToLocal('recipes', recipeData)
                return recipeData

            } catch (error) {
                console.error(error.message)
            }

        }
        fetchData()
        console.log(fetch)

    }, [])


    console.log(data)
    return data
}