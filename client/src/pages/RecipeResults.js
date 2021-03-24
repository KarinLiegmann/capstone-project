import styled from 'styled-components'
import PropTypes from 'prop-types'

import RecipeCards from '../components/RecipeCards'
import Button from '../components/Button'

export default function RecipeResults({ recipes }) {
    return (
        <Wrapper>
            <h2>Here is what we found:</h2>
            <RecipeCards
                recipes={recipes} />
            <h2>Recipes left: {recipes.length} </h2>
            <Button
                text="All Done!"
                isActive={true} />
            <p>Nothing to your taste?</p>
            <Button
                text="Try Again"
                isActive={false} />
        </Wrapper>
    )
}

const Wrapper = styled.section`
align-items: center;
display: flex;
flex-direction: column;
`

RecipeResults.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
}