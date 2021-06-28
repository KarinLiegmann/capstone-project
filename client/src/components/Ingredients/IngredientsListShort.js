import styled from 'styled-components'
import PropTypes from 'prop-types'

export function MissingIngredients({ recipe }) {
    return (
        <>{!recipe.isFavourite ? <StyledSpan>You need: </StyledSpan> : <StyledSpan>Ingredients: </StyledSpan>}{recipe.missedIngredients.map((missingIngredient => missingIngredient.name.toLowerCase())).join(', ')}</>
    )
}

export function UsedIngredients({ recipe }) {
    return (
        <>{!recipe.isFavourite && <StyledSpan>You have: </StyledSpan>}{recipe.usedIngredients.map((usedIngredient => usedIngredient.name.toLowerCase())).join(', ')}</>
    )
}

const StyledSpan = styled.span`
 font-weight: var(--fw-bold);
`

MissingIngredients.propTypes = {
    recipe: PropTypes.object.isRequired,
}

UsedIngredients.propTypes = {
    recipe: PropTypes.object.isRequired,
}