import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import img from '../assets/RecipeCardSmall_Background.png'

import Modal from './Modal'
import { ButtonSecondary } from './Buttons'

export default function RecipeCardSmall({ likedRecipes, onShowRecipePage }) {

    const [openModal, setOpenModal] = useState(false)

    const hideModal = () => {
        setOpenModal(false)
    }


    return (
        <>
            {likedRecipes && likedRecipes.map((likedRecipe) =>
            (<>
                <CardWrapper
                    key={likedRecipe.id}>
                    <header>
                        <img src={likedRecipe.image} alt={likedRecipe.title} />
                        <h3>{likedRecipe.title}</h3>
                    </header>

                    <ButtonSecondary
                        text="Cook Me"
                        isActive
                        onHandleClick={() => onShowRecipePage(likedRecipe)}
                    />

                    {likedRecipe.missedIngredients.length > 0 &&
                        <p><span>You need:</span> {
                            likedRecipe.missedIngredients.map((ingredient) => (<>{ingredient.name.toLowerCase()}, </>))}
                        </p>
                    }

                    <InfoButton onClick={() => setOpenModal(!openModal)}>Click for details</InfoButton>
                    <Modal
                        key={likedRecipe.id}
                        show={openModal}
                        handleClose={hideModal}
                    >
                        <h3>Missing Ingredients:</h3>
                        <ul>
                            {likedRecipe.missedIngredients && likedRecipe.missedIngredients.map((missedIngredient) => (
                                <li key={missedIngredient.id}>{missedIngredient.amount} {missedIngredient.unitShort} {missedIngredient.name.toLowerCase()}</li>
                            ))}
                        </ul>

                        <h3>Used Ingredients:</h3>
                        <ul>
                            {likedRecipe.usedIngredients && likedRecipe.usedIngredients.map((usedIngredient) => (
                                <li key={usedIngredient.id}>{usedIngredient.amount} {usedIngredient.unitShort} {usedIngredient.name.toLowerCase()}</li>
                            ))}
                        </ul>
                    </Modal>

                </CardWrapper>


            </>
            ))
            }
        </>
    )
}

const CardWrapper = styled.section`
align-items: center;
background-image: url(${img});
background-size: 100% auto;
background-repeat: no-repeat;
background-position-x: center;
background-position-y: center;
display: flex;
flex-direction: column;
flex-wrap: wrap;
margin-bottom: 10px;
min-height: 360px;
max-width: 350px;
min-width: 320px;
padding: 2.3rem 2rem;
text-align: left;

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

span {
    font-weight: var(--fw-bold);
}
`
const InfoButton = styled.p`
color: var(--clr-accent1);
font-weight: var(--fw-bold);
`
RecipeCardSmall.propTypes = {
    likedRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
}