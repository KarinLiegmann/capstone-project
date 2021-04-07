import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { AiFillStar } from 'react-icons/ai'

import BackIcon from '../components/BackIcon'
import { ButtonMain } from '../components/Buttons'
import IngredientTags from '../components/IngredientTags'
import IngredientsList from '../components/IngredientsList'


export default function RecipeInstructions({ activeIngredients, onDeleteTag, completeRecipe, onLikeRecipe, onToggleStatus, isFavourite }) {

    return (<>
        <Link to="/selections">
            <BackIcon />
        </Link>

        {completeRecipe &&
            <Wrapper>
                <header>
                    <img src={completeRecipe.image} alt={completeRecipe.title} />
                    <h2>{completeRecipe.title}</h2>
                </header>

                <FavouriteIcon
                    onClick={() => onLikeRecipe(completeRecipe)}
                    isFavourite={completeRecipe.isFavourite} />

                <CookingIngredients>
                    <h3>Cooking Ingredients</h3>
                    <IngredientsList ingredients={completeRecipe.missedIngredients} />
                    <IngredientsList ingredients={completeRecipe.usedIngredients} />
                </CookingIngredients>

                <Instructions>
                    <h3>Cooking Instructions</h3>
                    {completeRecipe.steps && completeRecipe.steps.length > 0 && completeRecipe.steps[0].map((step, index) => (
                        <p><span>Step {index + 1}:</span> {step}</p>
                    ))}
                </Instructions>

                <TagWrapper>
                    <h3>All done with cooking?</h3>
                    <p>Remove the ingredients you have used up:</p>
                    <IngredientTags
                        ingredients={activeIngredients}
                        onDeleteTag={onDeleteTag}
                        onToggleStatus={onToggleStatus} />
                </TagWrapper>

                <Link to="/" >
                    <ButtonMain
                        isActive
                        text="All Done!" />
                </Link>
            </Wrapper >
        }
    </>
    )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
margin-bottom: 2rem;
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

const FavouriteIcon = styled(AiFillStar)`
align-self: flex-end;
color: ${({ isFavourite }) => isFavourite ? 'var(--clr-accent2)' : 'var(--clr-accent2-light)'};
font-size: 2.7rem;
margin-right: 2rem;

&:hover,
&:active {
    transform: scale(1.2);
    color: var(--clr-accent2);
    cursor: pointer;
}
`

