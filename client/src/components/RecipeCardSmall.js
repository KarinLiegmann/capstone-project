import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import img from '../assets/RecipeCardSmall_Background.png'

import Modal from './Modal'
import { ButtonSecondary } from './Buttons'

export default function RecipeCardSmall({ likedRecipes }) {

    const [openModal, setOpenModal] = useState(false)

    const hideModal = () => {
        setOpenModal(false)
    }

    const missingIngredientsData = likedRecipes[0].missedIngredients.map((ingredient) => ingredient.name.toLowerCase())
    const missingIngredients = missingIngredientsData.join(', ')

    return (

        <CardWrapper>
            <header>
                <img src={likedRecipes[0].image} alt={likedRecipes[0].title} />
                <h3>{likedRecipes[0].title}</h3>
            </header>

            <ButtonSecondary
                text="Cook Me"
                isActive
            />

            {likedRecipes[0].missedIngredients.length > 0 &&
                <p><span>You need:</span> {missingIngredients}</p>
            }

            <InfoButton onClick={() => setOpenModal(!openModal)}>Click for details</InfoButton>
            <Modal
                show={openModal}
                handleClose={hideModal}>
                <h3>Missing Ingredients:</h3>
                <ul>
                    {likedRecipes[0].missedIngredients && likedRecipes[0].missedIngredients.map((missedIngredient) => (
                        <li key={missedIngredient.id}>{missedIngredient.amount} {missedIngredient.unitShort} {missedIngredient.name.toLowerCase()}</li>
                    ))}
                </ul>

                <h3>Used Ingredients:</h3>
                <ul>
                    {likedRecipes[0].usedIngredients && likedRecipes[0].usedIngredients.map((usedIngredient) => (
                        <li key={usedIngredient.id}>{usedIngredient.amount} {usedIngredient.unitShort} {usedIngredient.name.toLowerCase()}</li>
                    ))}
                </ul>
            </Modal>


        </CardWrapper>
    )
}

const CardWrapper = styled.section`
align-items: center;
background-image: url(${img});
background-size: cover;
background-repeat: no-repeat;
background-position-x: center;
display: flex;
flex-direction: column;
flex-wrap: wrap;
margin-bottom: 10px;
min-height: 500px;
max-width: 360px;
min-width: 320px;
padding: 2.3rem 2rem;

header {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
}

img {
    border-radius: 15px;
    height: 50%;
    margin-right: .6rem;
    width: 50%;
}

button {
    width: fit-content;
}
`
const InfoButton = styled.p`
color: var(--clr-accent1);
font-weight: var(--fw-bold);
`