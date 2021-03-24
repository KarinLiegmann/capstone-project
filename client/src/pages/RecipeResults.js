import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import RecipeCards from '../components/RecipeCards'
import Button from '../components/Button'

export default function RecipeResults({ recipes, onDeleteRecipe, onLikeRecipe }) {
    return (
        <Wrapper>
            <h2>Here is what we found:</h2>
            <RecipeCards
                recipes={recipes}
                onDeleteRecipe={onDeleteRecipe}
                onLikeRecipe={onLikeRecipe} />
            <h2>Recipes left: {recipes.length} </h2>
            <p>Click on the left Button to delete and on the right Button to keep!</p>
            <Button
                text="All Done!"
                isActive={true} />
            <p>Nothing to your taste?</p>
            <Link to="/">
                <Button
                    text="Try Again"
                    isActive={false} />
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
}