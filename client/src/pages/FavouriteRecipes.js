import styled from 'styled-components'
import { Link } from 'react-router-dom'

import BackIcon from '../components/Navigation/BackIcon'
import RecipeCardSmall from '../components/RecipeCardSmall'

export default function FavouriteRecipes({ recipes, onShowRecipePage, onOpenModal, onDeleteFavourite }) {
    return (<>
        <Link to="/">
            <BackIcon styleguide={false} />
        </Link>

        <Wrapper className="pageWrapper">
            <h2>Favourite Recipes</h2>

            {recipes.length === 0 && <p>Sorry, it seems you haven't any favourite recipes yet.</p>}

            <RecipeCardSmall
                recipes={recipes}
                onOpenModal={onOpenModal}
                onShowRecipePage={onShowRecipePage}
                onDeleteFavourite={onDeleteFavourite} />

        </Wrapper>
    </>
    )
}

const Wrapper = styled.div`
align-items: center;
display: flex;
flex-direction: column;
margin-top: 20%;

h2 {
    margin-bottom: 1rem;
}      

@media screen and (min-width: 1024px) {            
    margin-top: 5%; 

    h2 {
    margin-bottom: 3rem;
}        
}
`