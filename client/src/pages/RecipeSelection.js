import styled from 'styled-components'
import RecipeCardSmall from '../components/RecipeCardSmall'


export default function RecipeSelection({ likedRecipes, onShowRecipePage, onHandleClick, onOpenModal, onCloseModal }) {

    return (
        <Wrapper>
            <h2>My Recipes</h2>
            <RecipeCardSmall
                likedRecipes={likedRecipes}
                onShowRecipePage={onShowRecipePage}
                onHandleClick={onHandleClick}
                onOpenModal={onOpenModal}
                onCloseModal={onCloseModal} />
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