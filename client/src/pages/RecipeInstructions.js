import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadFromLocal } from "../library/localStorage"
import styled from 'styled-components'

import { ButtonMain } from '../components/Buttons'
import IngredientTags from '../components/IngredientTags'


export default function RecipeInstructions({ activeIngredients, likedRecipes, recipeInstructions }) {

    const [recipe, setRecipe] = useState(loadFromLocal('recipe') ?? {})

    const [instructions, setInstructions] = useState(loadFromLocal('recipeInstructions') ?? {})

    const [steps, setSteps] = useState([])
    console.log(instructions[0].steps)






    return (
        <Wrapper>
            <header>
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
            </header>

            <>

            </>

            <Instructions>
                <h3>Cooking Instructions</h3>
                {instructions[0].steps.map((step) => (
                    <>
                        <li key={step.number}><span>Step {step.number}:</span> {step.step}</li>
                    </>
                ))}
            </Instructions>

            <>
                {activeIngredients && activeIngredients.map((ingredient) => (
                    <li>{ingredient.name}</li>
                ))}
            </>

            <Link to="/selections" >
                <ButtonMain
                    isActive
                    text="Back" />
            </Link>



        </Wrapper>
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

