import styled from 'styled-components'
import { Link } from 'react-router-dom'

import SearchBar from '../components/SearchBar'
import IngredientTags from '../components/IngredientTags'
import { ButtonMain } from '../components/Buttons'


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
margin: 5% 0;

Button {
    margin-bottom: 2rem;
    width: fit-content;
}
`
