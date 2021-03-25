import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import img from '../assets/RecipeCard_Background.png'
import { FaHeart } from 'react-icons/fa'
import { RiDislikeLine } from 'react-icons/ri'

import Modal from './Modal'

export default function RecipeCard({ recipes, onDeleteRecipe, onLikeRecipe }) {

    const [openModal, setOpenModal] = useState(false)

    const hideModal = () => {
        setOpenModal(false)
    }


    return (
        <>
            {recipes && recipes.map((recipe) =>
            (<CardWrapper
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
                            <>
                                <StyledParagraph>You need:</StyledParagraph>
                                {recipe.missedIngredients && recipe.missedIngredients.map((missedIngredient) => (
                                    <p key={missedIngredient.id}> {missedIngredient.name.toLowerCase()}, </p>
                                ))}
                            </>
                        }

                        {recipe.usedIngredients.length > 0 &&
                            <>
                                <StyledParagraph>You have:</StyledParagraph>
                                {recipe.usedIngredients.map((usedIngredient) => (
                                    <p key={usedIngredient.id}>{usedIngredient.name.toLowerCase()},</p>
                                ))}
                            </>}
                        <InfoButton onClick={() => setOpenModal(!openModal)}>Click for details</InfoButton>
                        <Modal
                            show={openModal}
                            handleClose={hideModal}>
                            <h3>Missing Ingredients:</h3>
                            <ul>
                                {recipes[0].missedIngredients && recipes[0].missedIngredients.map((missedIngredient) => (
                                    <li key={missedIngredient.id}>{missedIngredient.amount} {missedIngredient.unitShort} {missedIngredient.name.toLowerCase()}</li>
                                ))}
                            </ul>

                            <h3>Used Ingredients:</h3>
                            <ul>
                                {recipes[0].usedIngredients && recipes[0].usedIngredients.map((usedIngredient) => (
                                    <li key={usedIngredient.id}>{usedIngredient.amount} {usedIngredient.unitShort} {usedIngredient.name.toLowerCase()}</li>
                                ))}
                            </ul>
                        </Modal>
                    </IngredientsWrapper>


                </CardContent>
            </CardWrapper >
            ))
            }
        </>
    )
}

const CardWrapper = styled.section`
background-image: url(${img});
background-size: cover;
background-repeat: no-repeat;
background-position-x: center;
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;
margin-bottom: 10px;
min-height: 500px;
max-width: 380px;
min-width: 320px;
`
const CardContent = styled.div`
height: min-content;
padding: 3.2rem 2.3rem;
max-width: inherit;

img {
    border-radius: 10px;
    width: 60%;
}

p {  
    margin: 0;    
}

li {
    text-align: left;
}
`

const IngredientsWrapper = styled.div`
display: flex;
flex-wrap: wrap;
`

const StyledParagraph = styled.p`
font-weight: var(--fw-bold);
margin: 0;
`

const InfoButton = styled.p`
color: var(--clr-accent1);
font-weight: var(--fw-bold);
`

const IconsWrapper = styled.div`
display: flex;
justify-content: space-around;
margin: 1.5rem 0;
`


const DislikeIcon = styled(RiDislikeLine)`
color: var(--clr-accent2-light);
font-size: 2.7rem;
justify-self: flex-end;
`

const LikeIcon = styled(FaHeart)`
color: var(--clr-accent2-light);
font-size: 2.5rem;
justify-self: flex-end;
`

RecipeCard.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteRecipe: PropTypes.func.isRequired,
    onLikeRecipe: PropTypes.func.isRequired
}