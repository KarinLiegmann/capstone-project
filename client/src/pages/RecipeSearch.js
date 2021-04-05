import styled from 'styled-components'
import { Link } from 'react-router-dom'

import SearchBar from '../components/SearchBar'
import IngredientTags from '../components/IngredientTags'
import { ButtonMain } from '../components/Buttons'


export default function RecipeSearch({ ingredients, onCreateIngredient, onDeleteTag, onGetRecipeResults, onToggleStatus }) {


    return (
        <Wrapper>
            <h2>Hey, what's in your <br />
                <span>fridge today?</span></h2>
            <SearchBar
                placeholderText="Search and add ingredient..."
                onCreateIngredient={onCreateIngredient}
            />
            <IngredientTags
                ingredients={ingredients}
                onToggleStatus={onToggleStatus}
                onDeleteTag={onDeleteTag}
            />
            <Link to="/results">
                <ButtonMain
                    text="Find Recipes"
                    onHandleClick={onGetRecipeResults}
                    isActive={true} />
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
padding: 0 2rem;
width: 100vw;

h2 {
    font-weight: var(--fw-semibold);
    text-align: left;

    span {
        font-weight: var(--fw-bold);
    }
}

button {
    align-self: flex-end;
    margin-bottom: 2rem;
    width: fit-content;
}
`
