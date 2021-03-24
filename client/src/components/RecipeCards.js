import styled from 'styled-components'
import { img } from '../assets/RecipeCard_Background.png'
import { FaHeart } from 'react-icons/fa'
import { RiDislikeLine } from 'react-icons/ri'

export default function RecipeCard({ recipes }) {
    return (
        <>
            {recipes && recipes.map((recipe) =>
            (<CardWrapper
                key={recipe.id}
            >
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <DislikeIcon />
                <LikeIcon />
                <p>You need:</p>
                {recipe.missedIngredients.map((missedIngredient) => (
                    <li>{missedIngredient.original}</li>
                ))}
                <p>You have:</p>
                {recipe.usedIngredients.map((usedIngredient) => (
                    <li>{usedIngredient.original}</li>
                ))}
                <p>Unused Ingredients:</p>
                {recipe.unusedIngredients.map((usedIngredient) => (
                    <li>{usedIngredient.name}</li>
                ))}
            </CardWrapper>
            ))}

        </>
    )
}

const CardWrapper = styled.section`
border: 1px solid var(--clr-dark);
margin-bottom: 10px;
`
const DislikeIcon = styled(RiDislikeLine)`
color: var(--clr-accent2-light);
font-size: var(--fs-h1);
justify-self: flex-end;
`

const LikeIcon = styled(FaHeart)`
color: var(--clr-accent2-light);
font-size: var(--fs-h1);
justify-self: flex-end;
`