import { useState } from 'react'
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import img from '../assets/RecipeCardSmall_Background.png'

import Modal2 from './Modal2'
import { ButtonSecondary } from './Buttons'

export default function RecipeCardSmall({ likedRecipes, onShowRecipePage, onHandleClick, id }) {

    const [openModal, setOpenModal] = useState(false)

    function showModal(recipe) {
        if (recipe.id === Modal2.id) {
            setOpenModal(!openModal)
            console.log(recipe.title)

        }


    }

    function closeModal() {
        setOpenModal(false)
    }

    let { url, path } = useRouteMatch();


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

                    <Link to={`/recipe/${likedRecipe.id}`}>
                        <ButtonSecondary
                            text="Cook Me"
                            isActive
                            onHandleClick={() => onShowRecipePage(likedRecipe)}
                        />
                    </Link>

                    {likedRecipe.missedIngredients.length > 0 &&
                        <p><span>You need:</span> {likedRecipe.missedIngredients.map((missingIngredient => missingIngredient.name.toLowerCase())).join(', ')}
                        </p>
                    }
                    <InfoButton onClick={() => showModal(likedRecipe)}>
                        Click for details
                        </InfoButton>
                </CardWrapper>

            </>
            ))
            }

            {openModal && likedRecipes.map((likedRecipe) => (<Modal2
                id={likedRecipe.id}
                openModal={openModal}
                onHandleClick={closeModal}>
                <p>{likedRecipe.title}</p>

                <ButtonSecondary isActive text="Close" onHandleClick={closeModal} />
            </Modal2>))}





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