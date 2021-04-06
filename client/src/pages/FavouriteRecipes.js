import styled from 'styled-components'
import { Link } from 'react-router-dom'

import BackIcon from '../components/BackIcon'
import RecipeCardSmall from '../components/RecipeCardSmall'

export default function FavouriteRecipes({ favouriteRecipes, onShowRecipePage, onOpenModal }) {
    return (<>
        <Link to="/">
            <BackIcon />
        </Link>

        <Wrapper>
            <h2>Your Favourite Recipes</h2>
            <RecipeCardSmall
                likedRecipes={favouriteRecipes}
                onOpenModal={onOpenModal}
                onShowRecipePage={onShowRecipePage} />
        </Wrapper>
    </>
    )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
margin-top: 25%;
`