import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadFromLocal } from "../library/localStorage"
import styled from 'styled-components'

import { ButtonMain } from '../components/Buttons'
import IngredientTags from '../components/IngredientTags'
import IngredientsList from '../components/IngredientsList'


export default function RecipeInstructions({ ingredients, activeIngredients, likedRecipes, recipeInstructions, onDeleteTag, completeRecipe }) {

    const [recipe, setRecipe] = useState(loadFromLocal('recipe') ?? {})

    const [instructions, setInstructions] = useState(loadFromLocal('recipeInstructions') ?? {})

    return (recipe && instructions &&
        <Wrapper>
            <header>
                <img src={completeRecipe.image} alt={completeRecipe.title} />
                <h2>{completeRecipe.title}</h2>
            </header>

            <CookingIngredients>
                <h3>Cooking Ingredients</h3>
                <IngredientsList ingredients={completeRecipe.missedIngredients} />
                <IngredientsList ingredients={completeRecipe.usedIngredients} />
            </CookingIngredients>

            <Instructions>
                <h3>Cooking Instructions</h3>
                {completeRecipe.steps[0].map((step, index) => (
                    <p><span>Step {index + 1}:</span> {step}</p>
                ))}
            </Instructions>

            <TagWrapper>
                <h3>All done with cooking?</h3>
                <p>Remove the ingredients you have used up:</p>
                <IngredientTags
                    ingredients={activeIngredients}
                    onDeleteTag={onDeleteTag} />
            </TagWrapper>


            <Link to="/selections" >
                <ButtonMain
                    isActive
                    text="Back" />
            </Link>
        </Wrapper >
    )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
margin-top: 25%;

header {
    padding: 0 2rem;

    img {
        border-radius: 20px;
        width: 90%;
    }
}
`

const Instructions = styled.ul`
list-style: none;
padding: 1.5rem;
text-align: left;

li {
    margin-top: 1rem;
}

span {
    font-weight: var(--fw-bold);
}
`

const CookingIngredients = styled.ul`
text-align: left;
`

const TagWrapper = styled.section`
padding: 1.5rem;
text-align: left;
`

