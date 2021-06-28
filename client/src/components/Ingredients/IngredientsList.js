import PropTypes from 'prop-types'

export default function IngredientsList({ ingredients }) {
    return (
        <>
            {ingredients && ingredients.map((ingredient) =>
            (<li key={ingredient.id}>{Math.ceil(ingredient.amount)} {ingredient.unitShort} {ingredient.name.toLowerCase()}</li>
            ))}
        </>
    )
}

IngredientsList.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
}
