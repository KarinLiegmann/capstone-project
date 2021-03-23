import styled from 'styled-components'
import PropTypes from 'prop-types'

import RecipeCards from '../components/RecipeCards'

export default function RecipeResults({ recipes }) {
    return (
        <>
            <h2>Here is what we found:</h2>
            <RecipeCards
                recipes={recipes} />
        </>
    )
}



RecipeResults.propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
}