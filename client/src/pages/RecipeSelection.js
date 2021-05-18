import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BackIcon from '../components/Navigation/BackIcon'
import RecipeCardSmall from '../components/RecipeCardSmall'


export default function RecipeSelection({ recipes, onShowRecipePage, onHandleClick, onOpenModal, onCloseModal }) {

    return (
        <>
            <Link to="/results">
                <BackIcon />
            </Link>

            <Wrapper className="pageWrapper">
                <h2>My Recipes</h2>

                {recipes.length === 0 && <p>Sorry, it seems you haven't any liked recipes yet.</p>}

                <RecipeCardSmall
                    recipes={recipes}
                    onShowRecipePage={onShowRecipePage}
                    onHandleClick={onHandleClick}
                    onOpenModal={onOpenModal}
                    onCloseModal={onCloseModal} />

            </Wrapper>
        </>
    )
}

const Wrapper = styled.section`
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
