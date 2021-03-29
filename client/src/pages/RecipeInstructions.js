import { useState } from 'react'
import { loadFromLocal } from "../library/localStorage"
import styled from 'styled-components'


export default function RecipeInstructions({ activeIngredients, likedRecipes, recipeInstructions }) {

    const [recipe, setRecipe] = useState(loadFromLocal('recipeInstructions') ?? {})
    const [steps, setSteps] = useState([])
    console.log(recipe[0].steps)




    return (
        <Wrapper>
            <p>test</p>
            <Instructions>
                {recipe[0].steps.map((step) => (
                    <>
                        <p>{step.ingredients && step.ingredients.map((ingredient) => (
                            <p>{ingredient.name}</p>
                        ))}</p>
                        <li key={step.number}><span>Step {step.number}:</span> {step.step}</li>
                    </>
                ))}
            </Instructions>
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

