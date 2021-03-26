import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import RecipeCards from '../components/RecipeCards'
import { ButtonMain, ButtonSecondary } from '../components/Buttons'

export default function RecipeResults({ recipes, onDeleteRecipe, onGetNextRecipes, onLikeRecipe }) {

    return (
        <Wrapper>
            <h2>Here is what we found:</h2>
            <RecipeCards
                recipes={recipes}
                onDeleteRecipe={onDeleteRecipe}
                onLikeRecipe={onLikeRecipe} />
            <h2>Recipes left: {recipes.length} </h2>
            <p>Click on the left Button to delete and on the right Button to keep!</p>
            <ButtonMain
                text="All Done!"
                isActive={true} />
            <p>Nothing to your taste?</p>

            <ButtonMain
                text="Try Again"
                onClick={() => onGetNextRecipes()} />

            <Link to="/">
                <ButtonSecondary
                    text="Go Back"
                    isActive={true} />
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.section`
align-items: center;
display: flex;
flex-direction: column;
margin: 5% 0;
`


RecipeResults.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteRecipe: PropTypes.func.isRequired,
    onLikeRecipe: PropTypes.func.isRequired
}