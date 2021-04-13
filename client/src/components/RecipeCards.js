import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaHeart } from 'react-icons/fa'
import { RiDislikeLine } from 'react-icons/ri'

import header from '../assets/CardHeader.png'
import footer from '../assets/CardFooter.png'

export default function RecipeCard({ recipes, onDeleteRecipe, onLikeRecipe, onOpenModal }) {

    return (
        <>
            {recipes.map((recipe, index) => {
                if (index === 0) {
                    return (<CardWrapper
                        key={recipe.id}
                    >
                        <CardContent>
                            <img src={recipe.image} alt={recipe.title} />
                            <h3>{recipe.title}</h3>
                            <IconsWrapper>
                                <DislikeIcon
                                    onClick={() => onDeleteRecipe(recipe.id)} />
                                <LikeIcon
                                    onClick={() => onLikeRecipe(recipe)} />
                            </IconsWrapper>

                            <IngredientsWrapper>
                                {recipe.missedIngredients.length > 0 &&
                                    <p><span>You need:</span> {recipe.missedIngredients.map((missingIngredient => missingIngredient.name.toLowerCase())).join(', ')}</p>
                                }

                                {recipe.usedIngredients.length > 0 &&
                                    <p><span>You have:</span> {recipe.usedIngredients.map((usedIngredient => usedIngredient.name.toLowerCase())).join(', ')}</p>
                                }
                            </IngredientsWrapper>

                            <InfoButton onClick={() => onOpenModal(recipe)}>
                                Click for details
                        </InfoButton>
                        </CardContent>
                    </CardWrapper >
                    )
                } else {
                    return null
                }
            })
            }
        </>
    )
}

const CardWrapper = styled.section`
align-items: center;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
margin-bottom: 10px;
max-width: 350px;
min-width: 320px;

&:before {
    content: url(${header});
    position: relative;
    left: 1rem;
    height: 100%;
    width: 100%;
}

&:after {
    content: url(${footer});
    position: relative;
    left: -.4rem;
    height: 100%;
    width: 100%;
}
`
const CardContent = styled.div`
background: #fff;
border-radius: 15px;
box-shadow: 2px 5px 10px rgba(0, 0, 0, .4);
padding: 1rem 1rem;
margin-bottom: -17rem;
margin-top: -11.5rem;
max-width: 320px;
z-index: 10;

img {
    border-radius: 10px;
    width: 60%;
}


li {
    text-align: left;
}
`

const IngredientsWrapper = styled.div`
text-align: left;
display: flex;
flex-wrap: wrap;

p {
    margin-bottom: 0.5rem;
}

span {
    font-weight: var(--fw-bold);
}
`

const InfoButton = styled.p`
color: var(--clr-accent1);
font-weight: var(--fw-bold);

&:hover,
&:active {
    transform: scale(1.2);
    cursor: pointer;
}
`

const IconsWrapper = styled.div`
display: flex;
justify-content: space-around;
margin: 1rem 0;
`


const DislikeIcon = styled(RiDislikeLine)`
color: var(--clr-accent2-light);
font-size: 2.7rem;
justify-self: flex-end;

&:hover,
&:active {
    transform: scale(1.2);
    color: var(--clr-accent2);
    cursor: pointer;
}
`

const LikeIcon = styled(FaHeart)`
color: var(--clr-accent2-light);
font-size: 2.5rem;
justify-self: flex-end;

&:hover,
&:active {
    transform: scale(1.2);
    color: var(--clr-accent2);
    cursor: pointer;
}
`

RecipeCard.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    /** deletes the card from the fetched recipes and shows the next card */
    onDeleteRecipe: PropTypes.func.isRequired,
    /** adds the card to likedRecipes and shows the next card */
    onLikeRecipe: PropTypes.func.isRequired
}