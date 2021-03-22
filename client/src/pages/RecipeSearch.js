import styled from 'styled-components'

import SearchBar from '../components/SearchBar'
import IngredientTags from '../components/IngredientTags'
import Button from '../components/Button'


export default function RecipeSearch({ ingredients, onCreateIngredient, onDeleteTag, onGetRecipeResults, onToggleStatus }) {



    return (
        <Wrapper>
            <h2>Hi, what's in your fridge today?</h2>
            <SearchBar
                placeholderText="Search and add ingredient..."
                onCreateIngredient={onCreateIngredient}
            />
            <IngredientTags
                ingredients={ingredients}
                onToggleStatus={onToggleStatus}
                onDeleteTag={onDeleteTag}
            />

            <Button
                text="Find Recipes"
                onHandleClick={onGetRecipeResults} />
        </Wrapper>
    )
}

const Wrapper = styled.section`

Button {
    width: fit-content;
}
`
