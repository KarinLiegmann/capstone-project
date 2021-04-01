import styled from 'styled-components'

import RecipeCardSmall from '../components/RecipeCardSmall'
import Modal from '../components/Modal'

export default function RecipeSelection({ likedRecipes, onShowRecipePage }) {
    return (
        <Wrapper>
            <h2>My Recipes</h2>
            <RecipeCardSmall
                likedRecipes={likedRecipes}
                onShowRecipePage={onShowRecipePage} />
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