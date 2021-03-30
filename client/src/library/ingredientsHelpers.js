import { saveToLocal } from './localStorage'

export function addNewIngredient(ingredient) {
    const newIngredient =
    {
        name: ingredient.name,
        id: ingredient.id,
        isActive: true
    }
    return newIngredient
}

export function deleteItem(ingredients, idToDelete) {
    const itemsToKeep = ingredients.filter(ingredient => (ingredient.id !== idToDelete))

    return itemsToKeep
}

export const toggleIngredient = (ingredients, idToToggle) => {
    const updatedIngredients = ingredients.map(ingredient => {
        if (ingredient.id === idToToggle) {
            ingredient.isActive = !ingredient.isActive
        }
        return ingredient;
    })
    return updatedIngredients;
}

export function filterActiveIngredients(ingredients) {
    const allActiveIngredients = ingredients.filter(ingredient => ingredient.isActive);

    saveToLocal('ingredients', ingredients)
    saveToLocal('activeIngredients', allActiveIngredients)

    return allActiveIngredients;
}