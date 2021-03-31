import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadFromLocal } from "../library/localStorage"
import styled from 'styled-components'

import { ButtonMain } from '../components/Buttons'
import IngredientTags from '../components/IngredientTags'


export default function RecipeInstructions({ activeIngredients, likedRecipes, recipeInstructions }) {

    const [instructions, setInstructions] = useState(loadFromLocal('recipeInstructions') ?? {})
    const [steps, setSteps] = useState([])
    console.log(instructions[0].steps)






    return (
        <Wrapper>
            <p>test-recipe</p>
            <Link to="/selections" >
                <ButtonMain
                    isActive
                    text="Back" />
            </Link>

            <Instructions>
                {instructions[0].steps.map((step) => (
                    <>
                        <p>{step.ingredients && step.ingredients.map((ingredient) => (
                            <p>{ingredient.name}</p>
                        ))}</p>
                        <li key={step.number}><span>Step {step.number}:</span> {step.step}</li>
                    </>
                ))}
            </Instructions>

            <>
                {activeIngredients && activeIngredients.map((ingredient) => (
                    <li>{ingredient.name}</li>
                ))}
            </>



        </Wrapper>
    )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
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

