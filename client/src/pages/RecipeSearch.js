import { useState, useEffect } from 'react'
import { saveToLocal, loadFromLocal } from '../library/localStorage'
import styled from 'styled-components'

import SearchBar from '../components/SearchBar'
import IngredientTags from '../components/IngredientTags'
import Button from '../components/Button'


export default function RecipeSearch() {

    const [ingredients, setIngredients] = useState([{
        ingredientName: "mozzarella sticks",
        id: 1234,
        isActive: true
    },
    {
        ingredientName: "chicken",
        id: 2345,
        isActive: true
    }])

    const [activeIngredients, setActiveIngredients] = useState([])
    const [inactiveIngredients, setInactiveIngredients] = useState([])

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
        setInactiveIngredients(ingredientsToKeep)
    }

    const toggleActiveState = (idToToggle) => {
        const updatedIngredients = ingredients.map(ingredient => {
            if (ingredient.id === idToToggle) {
                ingredient.isActive = !ingredient.isActive
                console.log(ingredient)
            }
            return ingredient;
        })
        setIngredients(updatedIngredients)
    }










    useEffect(() => {
        saveToLocal('ingredients', ingredients)
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
   align-self: flex-end;
    width: fit-content;
}
`
