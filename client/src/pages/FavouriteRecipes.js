import styled from 'styled-components'
import { Link } from 'react-router-dom'

import BackIcon from '../components/BackIcon'
import RecipeCardSmall from '../components/RecipeCardSmall'

export default function FavouriteRecipes({ recipes, onShowRecipePage, onOpenModal, onDeleteFavourite }) {
    return (<>
        <Link to="/">
            <BackIcon styleguide={false} />
        </Link>

        <Wrapper>
            <h2>Your Favourite Recipes</h2>
            <RecipeCardSmall
                recipes={recipes}
                onOpenModal={onOpenModal}
                onShowRecipePage={onShowRecipePage}
                onDeleteFavourite={onDeleteFavourite} />
        </Wrapper>
    </>
    )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
margin-top: 25%;
`