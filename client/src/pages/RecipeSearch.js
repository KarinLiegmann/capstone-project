import { useState, useEffect } from 'react'
import { loadFromLocal, saveToLocal } from '../library/localStorage'
import styled from 'styled-components'


import SearchBar from '../components/SearchBar'
import IngredientTag from '../components/IngredientTag'
import Button from '../components/Button'


export default function RecipeSearch() {
    const [ingredients, setIngredients] = useState(loadFromLocal('ingredients') ?? [])

    console.log(ingredients)

    function addIngredient(ingredient) {
        const newIngredient =
        {
            ingredientName: ingredient.toLowerCase(),
            isActive: true
        }
        setIngredients([...ingredients, newIngredient])
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
            {ingredients.map(ingredient => {
                <IngredientTag ingredientName={ingredients.ingredientName} />
            })}

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
