import styled from 'styled-components'
import { useState } from 'react'

import RecipeCardSmall from '../components/RecipeCardSmall'
import Modal2 from '../components/Modal2'

export default function RecipeSelection({ likedRecipes, onShowRecipePage }) {

    const [openModal, setOpenModal] = useState(false)

    const hideModal = () => {
        setOpenModal(false)
    }

    function showModal(recipe) {
        setOpenModal(!openModal)
    }





    return (
        <Wrapper>
            <h2>My Recipes</h2>
            <RecipeCardSmall
                likedRecipes={likedRecipes}
                onShowRecipePage={onShowRecipePage}
                onShowModal={showModal} />
            <Modal2

                onHideModal={hideModal}

                openModal={openModal} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
align-items: center;
display: flex;
flex-direction: column;
margin-top: 25%;

h2 {
    margin-bottom: 1rem;
}
`