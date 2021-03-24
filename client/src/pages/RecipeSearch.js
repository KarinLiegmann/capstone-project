import styled from 'styled-components'

import SearchBar from '../components/SearchBar'
import Button from '../components/Button'


export default function RecipeSearch({ onCreateIngredient }) {



    return (
        <Wrapper>
            <h2>Hi, what's in your fridge today?</h2>
            <SearchBar
                placeholderText="Search and add ingredient..."
                onCreateIngredient={onCreateIngredient}
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
