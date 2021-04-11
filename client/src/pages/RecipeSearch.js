import styled from 'styled-components'
import { Link } from 'react-router-dom'

import dots from '../assets/dots.png'

import SearchBar from '../components/SearchBar'
import IngredientTags from '../components/IngredientTags'
import { ButtonMain } from '../components/Buttons'


export default function RecipeSearch({ ingredients, onCreateIngredient, onDeleteTag, onGetRecipeResults, onToggleStatus }) {


    return (
        <Wrapper>
            <Headline>Hey, what's in your <span>fridge today?</span></Headline>
            <SearchBar
                placeholderText="Search and add ingredient..."
                onCreateIngredient={onCreateIngredient}
                data-testid="tag-input"
            />
            <IngredientTags
                ingredients={ingredients}
                onToggleStatus={onToggleStatus}
                onDeleteTag={onDeleteTag}
                data-testid="ingredient-tag"
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
height: 100vmin;
margin-top: 20%;
padding: 0 2rem;
width: 100vw;

button {
    margin: 2rem 0;
    width: fit-content;
}
`

const Headline = styled.h2`
background-image: url(${dots});
background-size: auto 92%;
background-position: top;
background-repeat: no-repeat;
font-weight: var(--fw-semibold);
margin-bottom: 2rem;
padding: 1.2rem 2rem;

    span {
        font-weight: var(--fw-bold);
    }

`
