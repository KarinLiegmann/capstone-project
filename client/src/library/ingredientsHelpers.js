

export function addNewIngredient(ingredient) {
    const newIngredient =
    {
        ...ingredient,
        isActive: true
    }
    return newIngredient
}

export function deleteItem(items, idToDelete) {
    const itemsToKeep = items.filter(item => (item.id !== idToDelete))
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
    return allActiveIngredients;
}









