import { useState, useEffect } from 'react'
import { loadFromLocal, saveToLocal } from '../library/localStorage'
import styled from 'styled-components'

import SearchBar from '../components/SearchBar'
import IngredientTags from '../components/IngredientTags'
import Button from '../components/Button'


export default function RecipeSearch() {

    const initialIngredient = [{
        ingredientName: '',
        id: '',
        isActive: true
    }]

    const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? initialIngredient)

    const [activeIngredients, setActiveIngredients] = useState(loadFromLocal('activeIngredients') ?? [])

    function addIngredient(ingredient) {
        const newIngredient =
        {
            ingredientName: ingredient.name,
            id: ingredient.id,
            isActive: true
        }

        setIngredients([...ingredients, newIngredient])
        console.log(ingredients)
    }

    const deleteIngredient = (idToDelete) => {
        const ingredientsToKeep = ingredients.filter(ingredient => (ingredient.id !== idToDelete))

        setIngredients(ingredientsToKeep)
        setActiveIngredients(ingredientsToKeep)
    }

    const toggleActiveState = (idToToggle) => {
        const updatedIngredients = ingredients.map(ingredient => {
            if (ingredient.id === idToToggle) {
                ingredient.isActive = !ingredient.isActive
            }
            return ingredient;
        })
        setIngredients(updatedIngredients)
    }

    function filterActiveIngredients() {
        const allActiveIngredients = ingredients.filter(ingredient => ingredient.isActive);
        setActiveIngredients(allActiveIngredients)
        saveToLocal('ingredients', ingredients)
        saveToLocal('activeIngredients', allActiveIngredients)
        console.log(activeIngredients)
    }


    useEffect(() => {
        filterActiveIngredients()
    }, [ingredients])

    return (
        <Wrapper>
            <h2>Hi, what's in your fridge today?</h2>
            <SearchBar
                placeholderText="Search and add ingredient..."
                onCreateIngredient={addIngredient}
            />
            <IngredientTags
                ingredients={ingredients}
                onToggleStatus={toggleActiveState}
                onDeleteTag={deleteIngredient}
            />

            <Button
                text="Find Recipes" />
        </Wrapper>
    )
}

const Wrapper = styled.section`

Button {
    width: fit-content;
}
`
