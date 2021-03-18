import { useState, useEffect } from 'react'
import { saveToLocal } from '../library/localStorage'
import styled from 'styled-components'


import SearchBar from '../components/SearchBar'
import IngredientTag from '../components/IngredientTag'
import Button from '../components/Button'


export default function RecipeSearch() {
    const [ingredients, setIngredients] = useState([])

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
            {ingredients.map(
                ({
                    ingredientName,
                    id
                }) => (
                    <IngredientTag
                        key={id}
                        text={ingredientName}
                    />)
            )}

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
